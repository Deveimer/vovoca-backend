const express = require('express')
const router = express.Router()
const musicController = require('../controllers/musicController')

router.get('/', musicController.getAllMusic)
router.get('/latest', musicController.getLatest)
router.get('/trending', musicController.getTrending)
router.patch('/download/:id', musicController.downloadMusic)
router.get('/:id', musicController.getMusic)

module.exports = router