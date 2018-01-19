const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const parser = require("body-parser").urlencoded({ extended: false });
const mongoose = require("mongoose");
const Book = require("./models/Books");

mongoose.connect("mongodb://localhost/book")
    .then(() => console.log('Mongoose connected!...'))
    .catch(err => console.log('Errorrrr.........'));
//const Book = mongoose.model("Book", book);

const app = express();
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "./layout");

app.use(express.static("./public"));

//call route index
const index = require("./routes/index");
app.use("/", index);

//call route book
const routeBook = require("./routes/book");
app.use("/book", routeBook);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});

/**
 * Book.insertMany([
    {
        title: "Tren Duong Bang",
        author: "Tony",
        detail: "Mo ta 1",
        user: "huong"
    },
    {
        title: "Tony buoi sang",
        author: "Tony",
        detail: "Mo ta 22",
        user: "ngoc"
    },
    {
        title: "Dac nhan tam",
        author: "Unknown",
        detail: "Mo ta .....",
        user: "nguyen"
    }
])
 */
