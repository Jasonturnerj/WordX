const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Sign Up Route', () => {
  it('should return error on missing username', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Username is required');
  });

  it('should return error on missing email', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email is required');
  });

  it('should return error on missing password', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ username: 'testuser', email: 'test@example.com' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Password is required');
  });

  it('should sign up successfully with valid data', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ username: 'newuser', email: 'newuser@example.com', password: 'password123' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });
});