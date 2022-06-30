const exchangeCodeForToken = async (code) => {
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'testtest',
    avatar: 'https://avatars.githubusercontent.com/u/93407960?v=4',
    email: '1@1.com',
  };
};
module.exports = { exchangeCodeForToken, getGithubProfile };
