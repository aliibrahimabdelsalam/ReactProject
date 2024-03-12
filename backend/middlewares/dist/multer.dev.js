"use strict";

var multer = require('multer');

var fs = require('fs');

var AppError = require('../utils/appError');

if (!fs.existsSync('./media')) {
  fs.mkdirSync('./media');
}

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './media');
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '.') + file.originalname);
  }
});

var multerFilter = function multerFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('File type not supported. Only image is allowed.', 401), false);
  }
};

var upload = multer({
  storage: storage,
  fileFilter: multerFilter
});
module.exports = upload;
//# sourceMappingURL=multer.dev.js.map
