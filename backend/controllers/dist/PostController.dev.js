"use strict";

var expressHandler = require('express-async-handler');

var Post = require('../models/postModel');

var postValidation = require('../utils/validation/postValidation');

var uploadMedia = require('../utils/uploadMedia');

var AppError = require('../utils/appError');

exports.createPost = expressHandler(function _callee(req, res, next) {
  var uploadRes, _postValidation$newPo, error, value, newPost;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(uploadMedia(req.file.path));

        case 2:
          uploadRes = _context.sent;
          // if (!req.body.user) req.body.user = req.user.id;
          _postValidation$newPo = postValidation.newPost({
            description: req.body.description,
            user: req.user.id,
            media: uploadRes.secure_url
          }), error = _postValidation$newPo.error, value = _postValidation$newPo.value;

          if (!error) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", next(new AppError('please enter valid data', 400)));

        case 6:
          console.log('here');
          _context.next = 9;
          return regeneratorRuntime.awrap(Post.create(value));

        case 9:
          newPost = _context.sent;
          console.log(newPost);
          res.status(201).json({
            status: 'success',
            data: newPost
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllPosts = expressHandler(function _callee2(req, res, next) {
  var posts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Post.find());

        case 2:
          posts = _context2.sent;
          res.status(200).json({
            status: 'success',
            result: posts.length,
            data: posts
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getPostsByUser = expressHandler(function _callee3(req, res, next) {
  var posts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Post.find({
            user: req.params.id
          }));

        case 2:
          posts = _context3.sent;
          res.status(200).json({
            status: 'success',
            result: posts.length,
            data: posts
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getOnePost = expressHandler(function _callee4(req, res, next) {
  var post;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 2:
          post = _context4.sent;

          if (post) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new AppError('Post Not Found', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            data: post
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.updatePost = expressHandler(function _callee5(req, res, next) {
  var post, uploadRes;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 2:
          post = _context5.sent;

          if (post) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new AppError('Post Not Found', 404)));

        case 5:
          if (!(req.user.id !== post.user._id.toString())) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new AppError('You do not have permission to perform this action. This action is only allowed for the owner of this post', 403)));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(uploadMedia(req.file.path));

        case 9:
          uploadRes = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.id, {
            description: req.body.description,
            user: req.body.user,
            media: uploadRes.secure_url
          }, {
            "new": true,
            runValidators: true
          }));

        case 12:
          post = _context5.sent;
          res.status(200).json({
            status: 'success',
            data: post
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deletePost = expressHandler(function _callee6(req, res, next) {
  var post;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 2:
          post = _context6.sent;

          if (post) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new AppError('Post Not Found', 404)));

        case 5:
          if (!(req.user.id !== post.user._id.toString())) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", next(new AppError('You do not have permission to perform this action. This action is only allowed for the owner of this post', 403)));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(Post.findByIdAndDelete(req.params.id));

        case 9:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
});
//# sourceMappingURL=PostController.dev.js.map
