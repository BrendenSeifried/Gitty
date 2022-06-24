const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/services/github.js');

const registerAndLogin = async (userTestLogin = {}) => {
  const password = userTestLogin.password ?? testUser.password;
  const agent = request.agent(app);
  const user = await GithubUser.create({ ...testUser, ...userTestLogin });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, username, avatar });
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should redirect to github auth page', async () => {
    const resp = await request(app).get('/api/v1/github/login');
    expect(resp.header.location).toMatch(
      `https://github.com/login/oauth/authorize?client_id=c6f2354ce21fc78aff9f&scope=user&redirect_uri=http://localhost:7890/api/v1/github/callback/`
    );
  });

  it('Test to redirect users to /dashboard when logged in', async () => {
    const resp = await request
      .agent(app)
      .get('/api/v1/github/callback')
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

  it('Test to confirm post is successful when logged in', async (req, res) => {
    const resp = await (
      await request(app).post('/posts')
    ).setEncoding({
      title: 'GORBOK THE DESTROYER',
      description: 'Ate KNOB KNOB, tastes like human',
    });
    expect(resp.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
