var configValues = require('./config');

module.exports = {
    //Ideally store encripted credentials and decript them here before using them

    getDbConnectionString: function() {
        return 'mongodb+srv://' + configValues.username + ':' + 
            configValues.password + '@cluster0.af7lknx.mongodb.net/node_todo_sample';
    }

}