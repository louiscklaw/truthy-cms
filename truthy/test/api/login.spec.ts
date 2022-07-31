import fetch from 'node-fetch';

const API_HOST = 'http://localhost:7777';
const LOGIN_ENDPOINT = `${API_HOST}/auth/login`;
const LOGOUT_ENDPOINT = `${API_HOST}/logout`;

describe('helloworld api', () => {
  it('helloworld mocha, chai', async () => {
    expect(true).toBe(true);
  });

  it('get helloworld request', async () => {
    const response = await fetch(API_HOST, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json());
  });

  it('login user1@truthy.com', async () => {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        username: 'user1@truthy.com',
        password: 'Truthy@123',
        remember: true,
      }),
    })
      .then(res => res.json())
      .then(res_json => {
        expect(res_json).toHaveProperty('accessToken');
        expect(res_json).toHaveProperty('user');
      });
  });
});
