const joi = require('joi');

exports.newUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    passwordConfirm: joi.string().valid(joi.ref('password')).required(),
    // media: joi.string(),
  });

  return schema.validate(user);
};

exports.updateUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    passwordConfirm: joi.string().valid(joi.ref('password')).required(),
    // media: joi.string(),
  });
  return schema.validate(user);
};
