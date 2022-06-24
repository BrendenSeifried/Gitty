const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const resp = await Post.getAll();
    res.json(resp);
  } catch (e) {
    next(e);
  }
});
