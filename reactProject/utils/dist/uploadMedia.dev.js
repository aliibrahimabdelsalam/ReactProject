"use strict";

var cloudinary = require('./cloudinary');

var fs = require('fs');

var uploadMedia = function uploadMedia(mediaPath) {
  var uploadRes;
  return regeneratorRuntime.async(function uploadMedia$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!mediaPath) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(mediaPath, {
            folder: 'samples',
            overwrite: true,
            invalidate: true,
            resource_type: 'auto'
          }));

        case 3:
          uploadRes = _context.sent;

          if (!uploadRes) {
            _context.next = 7;
            break;
          }

          fs.unlinkSync(mediaPath);
          return _context.abrupt("return", uploadRes);

        case 7:
          return _context.abrupt("return", false);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = uploadMedia;
//# sourceMappingURL=uploadMedia.dev.js.map
