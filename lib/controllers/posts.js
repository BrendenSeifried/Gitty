const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const resp = await Post.getAll();
    res.json(resp);
  } catch (e) {
    next(e);
  }
});
