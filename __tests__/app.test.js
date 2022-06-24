const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github.js');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should redirect to github auth page', async () => {
    const resp = await request(app).get('/api/v1/github/login');
    expect(resp.header.location).toMatch(
      // /https:\/\/github.com\/login\/oauth\/authorize?client_id=[\w\d]+&scope=user&redirect_url=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
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
  afterAll(() => {
    pool.end();
  });
});
