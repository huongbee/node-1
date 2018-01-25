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


/**

app.get('/dangky', (req, res) => {
    res.render('dangky');
});

app.get('/dangnhap', (req, res) => {
    res.render('dangnhap');
});

app.post('/dangky', (req, res) => {
    upload.single('avatar')(req, res, err => {
        const { name, email, password, phone } = req.body;
        const avatar = req.file ? req.file.filename : 'default.png';
        User.signUp(email, password, name, phone, avatar)
        .then(user => res.send('Dang ky thanh cong'))
        .catch(err => res.send('Dang ky that bai'));
    });
});

app.post('/dangnhap', parser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(() => res.send('Dang nhap thanh cong.'))
    .catch(err => res.send('Dang nhap that bai.'));
});

 */
