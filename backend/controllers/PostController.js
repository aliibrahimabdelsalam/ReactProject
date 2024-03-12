const expressHandler = require('express-async-handler');
const Post = require('../models/postModel');
const postValidation = require('../utils/validation/postValidation');
const uploadMedia = require('../utils/uploadMedia');
const AppError = require('../utils/appError');

exports.createPost = expressHandler(async (req, res, next) => {
  const uploadRes = await uploadMedia(req.file.path);

  // if (!req.body.user) req.body.user = req.user.id;
  const { error, value } = postValidation.newPost({
    description: req.body.description,
    user: req.user.id,
    media: uploadRes.secure_url,
  });

  if (error) {
    return next(new AppError('please enter valid data', 400));
  }
  console.log('here');
  const newPost = await Post.create(value);
  console.log(newPost);
  res.status(201).json({
    status: 'success',
    data: newPost,
  });
});

exports.getAllPosts = expressHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: posts,
  });
});
exports.getPostsByUser = expressHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.id });
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: posts,
  });
});
exports.getOnePost = expressHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.updatePost = expressHandler(async (req, res, next) => {
  let post;
  post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post Not Found', 404));
  }

  if (req.user.id !== post.user._id.toString()) {
    return next(
      new AppError(
        'You do not have permission to perform this action. This action is only allowed for the owner of this post',
        403
      )
    );
  }
  const uploadRes = await uploadMedia(req.file.path);

  post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      user: req.body.user,
      media: uploadRes.secure_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.deletePost = expressHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post Not Found', 404));
  }

  if (req.user.id !== post.user._id.toString()) {
    return next(
      new AppError(
        'You do not have permission to perform this action. This action is only allowed for the owner of this post',
        403
      )
    );
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
