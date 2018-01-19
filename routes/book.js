const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Books')

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

module.exports = router;
