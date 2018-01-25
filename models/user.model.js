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

/**
 * 
const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');

mongoose.connect('mongodb://localhost/mean1812', { useMongoClient: true });

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);

class User extends UserModel {
    static async signUp(email, password, name, phone, avatar) {
        const encrypted = await hash(password, 8);
        const user = new UserModel({ name, email, password: encrypted, phone, avatar });
        return user.save();
    }
    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Cannot find user.');
        const same = await compare(password, user.password);
        if (!same) throw new Error('Invalid password.');
    }
}

module.exports = User;
 * 
 * 
 */