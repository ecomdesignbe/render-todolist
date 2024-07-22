const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose
const todoSchema = new Schema({
    todos : {type : String }
})

mongoose.model('todo',todoSchema)