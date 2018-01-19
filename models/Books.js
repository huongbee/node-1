const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
module.exports = bookSchema


// const mongoose = require('mongoose')
// const book = require('./models/Books');

// mongoose.connect('mongodb://localhost/book', { useMongoClient: true });
// const Book = mongoose.model('Book', book)