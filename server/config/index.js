const env = process.env.ENVIRONMENT;
if(env !== "Production")
    var configValues = require('./config');

module.exports = {
    //Ideally store encripted credentials and decript them here before using them

    getDbConnectionString: function() {
        if(env !== "Production")
            return 'mongodb+srv://' + configValues.username + ':' + 
                configValues.password + configValues.database;
        return 'mongodb+srv://' + process.env.DBUSERNAME + ':' + 
            process.env.DBPASSWORD + process.env.DB;
    }

}