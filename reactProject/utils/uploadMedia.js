const cloudinary = require('./cloudinary');
const fs = require('fs');

const uploadMedia = async (mediaPath) => {
  if (mediaPath) {
    const uploadRes = await cloudinary.uploader.upload(mediaPath, {
      folder: 'samples',
      overwrite: true,
      invalidate: true,
      resource_type: 'auto',
    });
    if (uploadRes) {
      fs.unlinkSync(mediaPath);
      return uploadRes;
    }
  }
  return false;
};

module.exports = uploadMedia;
