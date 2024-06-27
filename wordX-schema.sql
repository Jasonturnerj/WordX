-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- Create Leaderboard Table
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    percent DECIMAL(5, 2) NOT NULL,
    words_per_minute INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
