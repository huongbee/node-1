
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const Book = require("./models/Books");
const db = require('./config/database')

mongoose.connect(db.mongoURI).then(() => console.log('Mongoose connected!...'))
    .catch(err => console.log('Errorrrr.........'));
//const Book = mongoose.model("Book", book);

const app = express();
app.set("view engine", "ejs");
app.use(express.static('./public'));

app.use(expressLayouts);
app.set("layout", "./layout");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


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
