var express = require('express');
const app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController');

app.use(cors());

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString())
    .then(() => console.log('Connected to the database!'));
setupController(app);
apiController(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});