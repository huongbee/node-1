const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/book')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
        return cb(new Error('File type not allow!'))
    }
    return cb(null, true)
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 200 * 1024 } })

module.exports = upload