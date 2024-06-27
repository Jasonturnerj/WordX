const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Game Route', () => {
  it('should fetch leaderboard successfully', async () => {
    const res = await request(app)
      .get('/leaderboard');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return error for submitting score without data', async () => {
    const res = await request(app)
      .post('/submit_score')
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Score data is required');
  });

  it('should submit score successfully with valid data', async () => {
    const res = await request(app)
      .post('/submit_score')
      .send({ percent: 90, words_per_minute: 45 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Score submitted successfully');
  });

  it('should return error for misspelled count without words', async () => {
    const res = await request(app)
      .post('/misspelled_count')
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Words are required');
  });

  it('should return misspelled words count with valid data', async () => {
    const res = await request(app)
      .post('/misspelled_count')
      .send({ words: ['hello', 'wrold'] });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('misspelledWordCount');
  });
});
