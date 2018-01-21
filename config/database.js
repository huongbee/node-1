if (process.env.NODE_ENV === 'production') {
    //bd on mlab
    module.exports = {
        mongoURI: 'mongodb://huong:huong123456@ds245347.mlab.com:45347/book-store-1'
    }
} else {
    //db local
    module.exports = {
        mongoURI: 'mongodb://localhost/book'
    }
}