const express = require("express");

const Todo = require("../server/models/todo.js");

// api endpoints: all these paths will be prefixed with "/todo/"
const router = express.Router();

router.get("/todos",  (req, res) => {
    Todo.find({}).then((todos) =>  { 
        return res.send(todos); 
    });
});

router.delete("/delete-todo",  (req, res) => {
    Todo.findOneAndDelete({ _id: req.body.id }).then((todo) => {
        res.send(todo);
    });
});

router.post("/todo",  (req, res) => {
    const newTodo = new Todo({ content: req.body.content, completed: req.body.completed});
    newTodo.save().then((newTodo) => { 
        res.send(newTodo);
    });
});

router.post("/todo-completed",  (req, res) => {
    Todo.findByIdAndUpdate({ _id: req.body.id }, {content: req.body.content, completed: req.body.completed}).then((todo) => {
        res.send(todo);
    });
});

module.exports = router;
