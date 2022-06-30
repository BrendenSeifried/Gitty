const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  //set up .env files as variables to fetch from github
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  //grab access_token and turn into strings then json
  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const returned = await resp.json();
  return returned.access_token;
};

//grab profile by user via fetched token
const getGithubProfile = async (info) => {
  const resp = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${info}`,
      Accept: `application/vnd.github.v3+json`,
    },
  });
  const person = await resp.json();
  return person;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
