"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name']
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    validate: [validator.isEmail, 'Enter A Valid Email']
  },
  password: {
    type: String,
    validate: [validator.isStrongPassword, 'Enter A Strong Password With minLength: 8,  minlowercase letter:1 ,minlowercase letter:1 min number:1, min symbol:1']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function validator(val) {
        return val === this.password;
      },
      message: 'Password Are not the same'
    }
  },
  media: {
    type: String
  }
}, {
  timestamps: true
});
userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 12));

        case 4:
          this.password = _context.sent;
          this.passwordConfirm = undefined;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

userSchema.methods.correctPassword = function _callee2(candidatePassword, userPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(candidatePassword, userPassword));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=userModel.dev.js.map
