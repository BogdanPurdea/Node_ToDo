var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController');

app.use(cors);

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/client'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString())
    .then(() => console.log('Connected to the database!'));
setupController(app);
apiController(app);

app.listen(port);