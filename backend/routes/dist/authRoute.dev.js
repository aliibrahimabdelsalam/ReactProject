"use strict";

var express = require('express');

var authController = require('../controllers/authController');

var upload = require('../middlewares/multer');

var router = express.Router();
router.route('/:id').patch(upload.single('media'), authController.edit);
router.route('/:id').get(authController.getUser);
router.route('/signup').post(upload.single('media'), authController.signup);
router.route('/login').post(authController.login);
module.exports = router;
//# sourceMappingURL=authRoute.dev.js.map
