"use strict";

var jwt = require('jsonwebtoken');

var signToken = function signToken(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

var createToken = function createToken(user, userStatus, req, res) {
  var token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none',
    credential: true
  });
  user.password = undefined;
  res.status(userStatus).json({
    status: 'success',
    token: token
  });
};

module.exports = createToken;
//# sourceMappingURL=createToken.dev.js.map
