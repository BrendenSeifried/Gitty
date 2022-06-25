const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const resp = await Post.getAll();
      res.json(resp);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    console.log(req.user);
    try {
      const data = await Post.create(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
