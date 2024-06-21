var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todo/:username', (req, res) => {
        Todos.find({ username: req.params.username })
            .then((todos, err) => {
                if(err) throw err;
                res.send(todos);
            });
    });
    app.get('/api/todo/:id', (req, res) => {
        Todos.findById({ _id: req.params.id })
            .then((todo, err) => {
                if(err) throw err;
                res.send(todo);
            });
    });

    app.post('/api/todo', (req, res) => {
        var newTodo = Todos({
            username: 'johndoe',
            todo: req.body.todo,
            isDone: req.body.isDone,
            hasAttachment: req.body.hasAttachment
        });
        newTodo.save().then((todo, err) => {
            if(err) throw err;
            res.json(newTodo);
        });
    });

    app.put('/api/todo/:id', (req, res) => {
        if(req.params.id) {
            var updatedTodo = Todos.findByIdAndUpdate(req.params.id, {
                todo: req.body.todo, 
                isDone: req.body.isDone, 
                hasAttachment: req.body.hasAttachment
            }).then((todo, err) => {
                if(err) throw err;
                res.json(updatedTodo);
            });
        }
    });

    app.delete('/api/todo/:id', (req, res) => {
        Todos.findByIdAndDelete(req.params.id)
            .then((todo, err) => {
                if(err) throw err;
                res.json({ message: 'Deleted successfully!' });
            });
    });

}