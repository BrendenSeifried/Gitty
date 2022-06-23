const fetch = require('cross-fetch');

const exchangeCodeForToken = async (data) => {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, data }),
  });
  const returned = await resp.json();
  console.log(returned);
};

const getGithubProfile = async (info) => {};

module.exports = { exchangeCodeForToken, getGithubProfile };
