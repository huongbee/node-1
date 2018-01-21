
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/book')
const upload = require('../helpers/UploadFile');
const multer = require("multer")()

const expressLayouts = require("express-ejs-layouts");
router.use(expressLayouts);

router.get("/", (req, res) => {
    Book.find({})
        .sort({ _id: -1 }) // -1:desc  1:asc
        .then(books => res.render("book/list", { title: "List Book", books }))
        .catch(err => console.log(err))

});

router.get("/add", (req, res) => {

    res.render("book/form", { title: "Add book", book: null });
});

router.post("/add", (req, res) => {
    const avatar = upload.single('avatar');
    avatar(req, res, err => {
        if (err) return res.send(err.message);
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

router.get("/edit/:id", (req, res) => {
    //console.log(req.params);
    Book.findOne({ _id: req.params.id })
        .then(book => res.render("book/edit", { title: "Edit book", book: book }))
        .catch(err => res.send(err.message))
});
router.post("/edit", (req, res) => {
    const user = 1;
    const avatar = upload.single('avatar');
    avatar(req, res, err => {
        const { title, author, detail } = req.body
        if (err) return res.send(err.message);
        else if (req.file == undefined) {
            Book.findByIdAndUpdate(req.body.id, { title, author, detail })
                .then((book) => {
                    if (!book) return res.send('Khong tim thay');
                    return res.redirect('./')
                })
                .catch(err => res.send(err.message));
        }
        else {
            const image = req.file.filename
            Book.findByIdAndUpdate(req.body.id, { title, author, detail, image })
                .then((book) => {
                    if (!book) return res.send('Khong tim thay');
                    res.redirect('./')
                })
                .catch(err => res.send(err.message));
        }
    })
});
router.get('/delete/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id)
        .then(book => {
            if (!book) return res.send('Not Found!!')
            return res.redirect('/book')
        }).catch(err => res.send("Errr.."))
})
module.exports = router;

