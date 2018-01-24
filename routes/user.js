const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const bodyParser = require('body-parser').urlencoded({ extended: false })
const passport = require("passport")
// const LocalStrategy = require('passport-local').Strategy;



router.get('/register', (req, res) => {
    return res.render('user/register', { title: "Register" })
})
router.post('/register', bodyParser, (req, res) => {
    User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    }).then(user => {
        if (!user) {
            const { username, email, password, fullname, gender, birthdate } = req.body
            bcrypt.hash(password, 10)
                .then(pwHash => {
                    new User({ username, email, password: pwHash, fullname, gender, birthdate })
                        .save()
                        .then(() => res.redirect('login'))
                })
        }
        else res.send('Username or email exists')
    }).catch(err => {
        res.send(err)
    })
})
router.get('/login', (req, res) => {
    return res.render('user/login', { title: "Login" })
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/book',
        failureRedirect: './login',
        failureFlash: false,
    })(req, res, next)
})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('./login')
})
module.exports = router
