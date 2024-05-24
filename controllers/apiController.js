var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todos/:username', function(req, res) {
        Todos.find({ username: req.params.username })
            .then((todos, err) => {
                if(err) throw err;
                res.send(todos);
            });
    });
    app.get('/api/todo/:id', function(req, res) {
        Todos.findById({ _id: req.params.id })
            .then((todo, err) => {
                if(err) throw err;
                res.send(todo);
            });
    });

    app.post('/api/todo', function(req, res) {
        if(req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo, 
                isDone: req.body.isDone, 
                hasAttachment: req.body.hasAttachment
            }).then((todo, err) => {
                if(err) throw err;
                res.send('Updated successfully!');
            });
        }
        else {
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save().then((todo, err) => {
                if(err) throw err;
                res.send('Added successfully!');
            });
        }
    });

    app.delete('/api/todo', function(req, res) {
        Todos.findByIdAndDelete(req.body.id)
            .then((err) => {
                if(err) throw err;
                res.send('Deleted successfully!');
            });
    });

}