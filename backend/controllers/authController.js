const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const expressHandler = require('express-async-handler');
const User = require('../models/userModel');
const userValidation = require('../utils/validation/userValidation');
const createToken = require('../utils/createToken');
const uploadMedia = require('../utils/uploadMedia');
const AppError = require('../utils/appError');
require('dotenv').config();
exports.signup = expressHandler(async (req, res, next) => {
  // const uploadRes = await uploadMedia(req.file.path);

  const { error, value } = userValidation.newUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // media: uploadRes.secure_url,
  });
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const existingUser = await User.findOne({ email: value.email });
  if (existingUser) {
    return next(new AppError('Email already exists', 400));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // media: uploadRes.secure_url,
  });

  createToken(newUser, 201, req, res);
});

exports.login = expressHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email And Password Are Required', 400));
  }

  const user = await User.findOne({ email: email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email Or Password', 400));
  }

  createToken(user, 200, req, res);
});

exports.edit = expressHandler(async (req, res, next) => {
  console.log(req.params.id);

  const uploadRes = await uploadMedia(req.file.path);
  console.log('upload ', uploadRes.secure_url);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      media: uploadRes.secure_url,
    },
    {
      new: true,
    }
  );
  console.log(user);
  res.status(201).json({
    state: 'success',
    data: user,
  });
});

exports.protected = expressHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You Are Not Logged In! Please Log In To Get Access.', 401)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
