const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/services/github.js');

const registerAndLogin = async () => {
  const agent = request.agent(app);
  await agent.get('/api/v1/github/callback?code=42');
  return agent;
};

describe('gitty-tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('should redirect to github auth page', async () => {
    const resp = await request(app).get('/api/v1/github/login');
    expect(resp.header.location).toMatch(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  });

  it('Test to redirect users to /dashboard when logged in', async () => {
    const resp = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    expect(resp.body).toEqual({
      id: expect.any(String),
      username: 'testtest',
      email: '1@1.com',
      avatar: null,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('Test to grab all posts', async () => {
    const resp = await request(app).get('/api/v1/posts');
    const test = resp.body.find((post) => post.title === 'KNOB KNOBs diary');

    expect(test).toHaveProperty('title', 'KNOB KNOBs diary');
  });

  it('Test to confirm post is successful when logged in', async () => {
    const agent = await registerAndLogin();

    const resp = await agent.post('/api/v1/posts').send({
      title: 'GORBOK THE DESTROYER',
      description: 'Ate KNOB KNOB, tastes like human',
    });
    // console.log(variable);
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('title', 'GORBOK THE DESTROYER');
    expect(resp.body).toHaveProperty(
      'description',
      'Ate KNOB KNOB, tastes like human'
    );
  });

  afterAll(() => {
    pool.end();
  });
});
