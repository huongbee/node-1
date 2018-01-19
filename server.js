const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const parser = require('body-parser').urlencoded({ extended: false })

const app = express();
app.set('view engine', 'ejs')

app.use(expressLayouts);
app.set('layout', './layout');

app.use(express.static('./public'))

//call route index
const index = require('./routes/index');
app.use('/', index)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
});
