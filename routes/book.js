
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Books')
const upload = require('../helpers/UploadFile');

const expressLayouts = require("express-ejs-layouts");
router.use(expressLayouts);

router.get("/", (req, res) => {
    Book.find({})
        .then(books => res.render("pages/list", { title: "List Book", books }))
        .catch(err => console.log(err))

});

router.get("/add", (req, res) => {

    res.render("pages/add", { title: "Add book" });
});
router.post("/add", (req, res) => {
    const avatar = upload.single('avatar');
    avatar(req, res, err => {
        if (err) return res.send(err.message);
        // console.log(req.body);
        // console.log(req.file);
        new Book({
            title: req.body.title,
            author: req.body.author,
            user: 1,
            detail: req.body.detail,
            image: req.file.filename
        }).save()
            .then(() => res.redirect('./'))
            .catch(err => res.send(err.message));

    })

});

module.exports = router;
