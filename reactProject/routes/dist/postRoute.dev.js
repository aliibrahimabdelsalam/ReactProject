"use strict";

var express = require('express');

var authController = require('../controllers/authController');

var postController = require('../controllers/PostController');

var upload = require('../middlewares/multer');

var router = express.Router();
router.route('/').get(postController.getAllPosts);
router.use(authController["protected"]);
router.route('/profile/:id').get(postController.getPostsByUser);
router.route('/').post(upload.single('media'), postController.createPost);
router.route('/:id').patch(upload.single('media'), postController.updatePost).get(postController.getOnePost)["delete"](postController.deletePost);
module.exports = router;
//# sourceMappingURL=postRoute.dev.js.map
