var express = require('express');
const app = express();
const path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController');

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200', 'https://node-todo-ohta.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
app.use((req, res, next) => {  
    res.header("Access-Control-Allow-Headers",  
               "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
}); 

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString())
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Failed to connect to the database!', err));
setupController(app);
apiController(app);

app.use(express.static(path.join(__dirname, '../client/dist/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/client', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});