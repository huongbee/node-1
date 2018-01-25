
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')
const session = require("express-session")
const passport = require('passport')
const mongoose = require("mongoose");
const db = require('./config/database')
const app = express();

mongoose.connect(db.mongoURI)
    .then(() => console.log('Mongoose connected!...'))
    .catch(err => console.log('Errorrrr.........'));
//const Book = mongoose.model("Book", book);
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static('./public/'));

app.use(expressLayouts);
app.set("layout", "./layout");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
    secret: 'secretdfffffddferwedw4443332',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { secure: false, maxAge: 100000 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next()
})

//call route index
const index = require("./routes/index");
app.use("/", index);

//call route book
const routeBook = require("./routes/book");
app.use("/book", routeBook);

//call route user
const routeUser = require("./routes/user");
app.use("/user", routeUser);


require('./config/passport')(passport);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});
