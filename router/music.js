const express = require('express')
const upload = require('../middlewares/multer')
const router = express.Router()
const musicController = require('../controllers/musicController')
const authAdmin = require('../middlewares/authAdmin')

router.post('/', upload.single('music'), authAdmin, musicController.addMusic)
router.get('/', musicController.getAllMusic)
router.get('/latest', musicController.getLatest)
router.get('/trending', musicController.getTrending)

module.exports = router