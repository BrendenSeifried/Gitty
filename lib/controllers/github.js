const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getGithubProfile } = require('../services/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })

  .get('/callback', async (req, res) => {
    const { data } = req.query;
    const githubToken = exchangeCodeForToken(data);
    const githubInfo = getGithubProfile(githubToken);
    console.log(githubInfo);
    res.json({ data });
  });
