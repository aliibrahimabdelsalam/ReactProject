"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, 'post must have description']
  },
  media: {
    type: String,
    required: [true, 'post must have attach file']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'post Must Belong To User']
  }
}, {
  timestamps: true
});
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name media '
  });
  next();
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
//# sourceMappingURL=postModel.dev.js.map
