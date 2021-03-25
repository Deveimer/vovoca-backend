const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 40000000
    },
    fileFilter: (req, file, cb) => {
        if(file.originalname.endsWith('mp3') || file.originalname.endsWith('wav') || file.originalname.endsWith('ogg'))
            return cb(null, true)
        else
            return cb("Please upload audio files only", false)
    }
})
// File gets saved in req.file
module.exports = upload