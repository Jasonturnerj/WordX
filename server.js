const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SpellChecker = require('simple-spellchecker');
const { Pool } = require('pg');
const config = require('./config'); // Import config

const app = express();
const port = config.PORT;
const secretKey = config.SECRET_KEY;

const db = new Pool({
  connectionString: config.getDatabaseUri()
});

// Middleware to parse URL-encoded form data and cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check authentication
function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.redirect('/login.html');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.redirect('/login.html');
    req.user = user;
    next();
  });
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.redirect('/signup');
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

app.post('/submit_score', authenticateToken, async (req, res) => {
  const { percent, words_per_minute } = req.body;
  const userId = req.user.id;

  const sanitizedPercent = parseFloat(percent);
  const sanitizedWordsPerMinute = parseInt(words_per_minute, 10);

  if (isNaN(sanitizedPercent) || isNaN(sanitizedWordsPerMinute)) {
    return res.status(400).json({ error: 'Invalid percent or words_per_minute' });
  }

  try {
    const result = await db.query(
      `INSERT INTO scores (user_id, percent, words_per_minute)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id)
       DO UPDATE SET percent = EXCLUDED.percent, words_per_minute = EXCLUDED.words_per_minute
       RETURNING *`,
      [userId, sanitizedPercent, sanitizedWordsPerMinute]
    );
    res.status(201).json({ message: 'Score added/updated.', score: result.rows[0] });
  } catch (err) {
    console.error('Error adding/updating score:', err);
    res.status(500).send('Internal server error.');
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await db.query(`
      SELECT u.username, s.percent, s.words_per_minute 
      FROM scores s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.percent DESC
      LIMIT 10
    `);

    res.json(leaderboardData.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Internal server error.');
  }
});

app.post("/misspelled_count", async (req, res) => {
  function misspelledCount(words) {
    return new Promise(function (resolve) {
      SpellChecker.getDictionary("en-US", function(err, dictionary) {
        if (!err) {
          let misspelledCount = 0;
          for (let word of words) {
            var misspelled = !dictionary.spellCheck(word);
            if (misspelled) {
              misspelledCount++;
            }
          }
          console.log("MISSPELLED COUNT: " + misspelledCount);
          resolve(misspelledCount);
        }
      });
    });
  }
  misspelledCount(req.body["words[]"]).then(function (data) {
    res.send(data.toString());
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
