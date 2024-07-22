const express = require('express')
const mongoose = require('mongoose')
const app = express()
const todo = mongoose.model('todo')
const ejs = require('ejs')


app.get('/', async(req, res) => {
    const data = await todo.find({}).exec()
    res.render('index.ejs', {todos : data})
})

app.post('/', async (req, res) => {
    try {
        let data = new todo({
            todos: req.body.todos
        });

        if (!req.body.todos) {
            return res.status(400).send('Todos field is required')
        }

        const savedData = await data.save()
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
});


app.post('/:id', async (req, res) => {
    const taskId = req.params.id
    try {
        const data = await todo.findById(taskId)
        if (!data) {
            return res.status(404).send('Task not found')
        }
        await data.deleteOne()
        res.redirect('/')
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
});


app.get('/delete/all', async(req, res) => {
    await todo.deleteMany()
    res.redirect('/')
})

module.exports = app