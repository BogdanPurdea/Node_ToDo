var Todos = require('../models/todoModel');

module.exports = function(app) {

    app.get('/api/setupTodos', function(req, res) {

        //seed database
        var startedTodos = [
            {
              "username": "johndoe",
              "todo": "Read a book",
              "isDone": false,
              "hasAttachment": false
            },
            {
              "username": "johndoe",
              "todo": "Write a report",
              "isDone": true,
              "hasAttachment": true
            },
            {
              "username": "johndoe",
              "todo": "Attend meeting",
              "isDone": false,
              "hasAttachment": true
            }
          ];
          Todos.create(startedTodos).then((results, err) => {
            if(err) throw err;
            res.send('Entries successfully added');
          });
    })

}