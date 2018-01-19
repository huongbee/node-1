const express = require('express');
const Router = express.Router();

const expressLayouts = require('express-ejs-layouts')
router.use(expressLayouts);


router.get('/', (req, res) => {
    res.render('pages/list', { title: 'List Book' })
})


router.get('/add', (req, res) => {
    res.render('pages/add', { title: 'Add book' })
})

module.exports = router