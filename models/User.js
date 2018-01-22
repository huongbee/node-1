const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
    },
    birthdate: {
        type: Date
    }
})
const User = mongoose.model('user', userSchema)
module.exports = User