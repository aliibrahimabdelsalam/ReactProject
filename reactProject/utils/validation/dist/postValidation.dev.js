"use strict";

var joi = require('joi');

exports.newPost = function (post) {
  var schema = joi.object({
    description: joi.string().trim().required(),
    media: joi.string().required(),
    user: joi.string().regex(/^[0-9a-fA-F]{24}$/) // .required(),

  });
  return schema.validate(post);
};

exports.updatePost = function (post) {
  var schema = joi.object({
    description: joi.string().trim().required(),
    media: joi.string().required()
  });
  return schema.validate(post);
};
//# sourceMappingURL=postValidation.dev.js.map
