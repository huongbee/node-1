const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../models/user.model")
const LocalStrategy = require("passport-local").Strategy

module.exports = passport => {

    passport.use(new LocalStrategy(({
        usernameField: 'email',
        passwordField: 'password'
    }), (email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if (!user) return done(null, false, { message: 'Incorrect email.' })
                else {
                    bcrypt.compare(password, user.password).
                        then(user => {
                            if (!user) return done(null, false, { message: 'Incorrect pass.' })

                            else return done(null, user);
                        });

                }
            })
            .catch(err => done(err))
    }))
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        User.findById(user._id, (err, user) => {
            done(err, user);
        });
    });
}