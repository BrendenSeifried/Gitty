const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should redirect to github auth page', async () => {
    const resp = await request(app).get('/api/v1/github/login');
    expect(resp.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize?client_id=[\w\d]+&scope=user&redirect_url=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });
  afterAll(() => {
    pool.end();
  });
});
