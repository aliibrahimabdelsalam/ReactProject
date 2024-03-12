const express = require('express');
const authController = require('../controllers/authController');
const upload = require('../middlewares/multer');

const router = express.Router();
router.route('/:id').patch(upload.single('media'), authController.edit);
router.route('/signup').post(upload.single('media'), authController.signup);
router.route('/login').post(authController.login);

module.exports = router;
