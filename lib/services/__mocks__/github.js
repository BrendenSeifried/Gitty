const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    username: 'Brenden Seifried',
    avatar: 'https://avatars.githubusercontent.com/u/93407960?v=4',
    email: 'brendenseifried@gmail.com',
  };
};
module.exports = { exchangeCodeForToken, getGithubProfile };
