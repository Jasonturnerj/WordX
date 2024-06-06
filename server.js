const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');
const { PerformanceNodeTiming } = require('perf_hooks');


const app = express();
const port = 3000;
const secretKey = 'hazelislong';

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wordX',
  password: '1122',
  port: 5432,
});
// Middleware to parse URL-encoded form data and cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.redirect('/login.html');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.redirect('/login.html');
    req.user = user;
    next();
  });
};

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.get ('/', (req, res) => {
  res.redirect('/signup')
});

// Define routes for the HTML pages
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));

});

app.get('/game', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPassword]);
    const userId = result.rows[0].id;

    const token = jwt.sign({ id: userId, username }, secretKey, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/game');
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Internal server error.');
  }
});


  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
  
      if (!user) return res.status(404).send('User not found.');
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).send('Invalid password.');
  
      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true });
      res.redirect('/game');
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Internal server error.');
    }
  });


  app.post('/game', authenticateToken, async (req, res) => {
  const { percent, words_per_minute } = req.body;
  const userId = req.user.id;

  try {
    await db.query('INSERT INTO scores (user_id, percent, words_per_minute) VALUES ($1, $2, $3)', [userId, percent, words_per_minute]);
    res.status(201).send('Score added.');
  } catch (err) {
    console.error('Error adding score:', err);
    res.status(500).send('Internal server error.');
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get('/leaderboard', async (req, res) => {
  try {
    // Fetch leaderboard data from the database
    const leaderboardData = await db.query(`
      SELECT u.username, s.percent, s.words_per_minute 
      FROM scores s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.percent DESC
      LIMIT 10
    `);

    // Send the leaderboard data as JSON response
    res.json(leaderboardData.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Internal server error.');
  }
});