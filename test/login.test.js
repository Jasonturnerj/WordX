const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Login Route', () => {
  it('should return error on missing username', async () => {
    const res = await request(app)
      .post('/login')
      .send({ password: 'password123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Username is required');
  });

  it('should return error on missing password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Password is required');
  });

  it('should return error on invalid password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid password');
  });

  it('should log in successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'validuser', password: 'validpassword' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });
});
