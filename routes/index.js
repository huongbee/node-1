const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const router = express.Router();
router.use(expressLayouts);

router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

router.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

module.exports = router;
