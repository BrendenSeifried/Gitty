const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const {
  getGithubProfile,
  exchangeCodeForToken,
} = require('../services/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  //send request to login page
  .get('/login', async (req, res) => {
    //use .env variable secrets as client_id and redirect uri made in github
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })

  .get('/callback', async (req, res) => {
    //grab the access code from github once returned
    const { code } = req.query;
    //grab the access token from github then jsonify
    const githubToken = await exchangeCodeForToken(code);
    //take the accesstoken and use it as a profile attribute to find the properties
    const githubInfo = await getGithubProfile(githubToken);

    //find user name using profile parameters
    let user = await GithubUser.findByUsername(githubInfo.login);

    //if user does not exist create one using username email and avatar parameters
    if (!user) {
      user = await GithubUser.insert({
        username: githubInfo.login,
        email: githubInfo.email,
        avatar: githubInfo.avatar_url,
      });
      console.log(githubInfo.email);
    }
    console.log('userinfo', user);
    // res.json({ code });
    //this creates enconded data for security & then attaches payload to the cookie
    const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    console.log(payload);
    //set cookie and payload for one day max also encrypt the payload
    res
      .cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      //once complete redirect to dashboard
      .redirect('/api/v1/github/dashboard');
  })
  //dash board renders once authenticated
  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  });
