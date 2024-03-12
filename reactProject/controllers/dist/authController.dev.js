"use strict";

var _require = require('util'),
    promisify = _require.promisify;

var jwt = require('jsonwebtoken');

var expressHandler = require('express-async-handler');

var User = require('../models/userModel');

var userValidation = require('../utils/validation/userValidation');

var createToken = require('../utils/createToken');

var uploadMedia = require('../utils/uploadMedia');

var AppError = require('../utils/appError');

require('dotenv').config();

exports.signup = expressHandler(function _callee(req, res, next) {
  var _userValidation$newUs, error, value, existingUser, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const uploadRes = await uploadMedia(req.file.path);
          _userValidation$newUs = userValidation.newUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm // media: uploadRes.secure_url,

          }), error = _userValidation$newUs.error, value = _userValidation$newUs.value;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new AppError(error.details[0].message, 400)));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: value.email
          }));

        case 5:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", next(new AppError('Email already exists', 400)));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm // media: uploadRes.secure_url,

          }));

        case 10:
          newUser = _context.sent;
          createToken(newUser, 201, req, res);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = expressHandler(function _callee2(req, res, next) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Email And Password Are Required', 400)));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 10:
          _context2.t0 = !_context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Incorrect Email Or Password', 400)));

        case 13:
          createToken(user, 200, req, res);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.edit = expressHandler(function _callee3(req, res, next) {
  var uploadRes, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.params.id);
          _context3.next = 3;
          return regeneratorRuntime.awrap(uploadMedia(req.file.path));

        case 3:
          uploadRes = _context3.sent;
          console.log('upload ', uploadRes.secure_url);
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, {
            media: uploadRes.secure_url
          }, {
            "new": true
          }));

        case 7:
          user = _context3.sent;
          console.log(user);
          res.status(201).json({
            state: 'success',
            data: user
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports["protected"] = expressHandler(function _callee4(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
          } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
          }

          if (token) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", next(new AppError('You Are Not Logged In! Please Log In To Get Access.', 401)));

        case 3:
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          next();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
//# sourceMappingURL=authController.dev.js.map
