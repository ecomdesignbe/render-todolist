const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://steve:XQqSDbyK4wtR6T5u@cluster0.lb4kyf3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.use(express.json())
app.set('view engine', ejs)
app.use(bodyparser.urlencoded({extended:true}))


require('./model/todo')

app.use(require('./routes/todos'))


app.listen('3000', (req, res) => {
    console.log('Server listening')
})

