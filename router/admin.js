const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const authAdmin = require('../middlewares/authAdmin')
const upload = require('../middlewares/multer')

router.post('/register', adminController.register)
router.post('/login', adminController.login)
router.post('/logout', adminController.logout)
router.get('/', authAdmin, adminController.getUser)
router.post('/', upload.single('music'), authAdmin, adminController.addMusic)
router.get('/uploaded', authAdmin, adminController.getUploaded)

module.exports = router