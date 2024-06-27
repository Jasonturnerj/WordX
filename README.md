
  # WordX

**[WordX Live Site](https://wordx-ci54.onrender.com)** 

WordX is an interactive web application designed to help users improve their typing accuracy and speed. The app allows users to type out words displayed on the screen, tracks the number of correctly and incorrectly typed words, and calculates the words per minute (WPM) and accuracy percentage. It also features a leaderboard to showcase top scores.

## Features

- **Real-time Typing Test**: Tracks typing speed and accuracy in real-time.
- **60-Second Timer**: Users have 60 seconds to type as many words as possible.
- **Leaderboard**: Displays top 10 scores with usernames, percentages, and WPM.
- **User Authentication**: Users can sign up, log in, and have their scores saved to their profiles.
- **Responsive Design**: Ensures the app is usable on various devices.

These features were chosen to create a comprehensive and engaging experience for users looking to improve their typing skills. The real-time feedback and competitive leaderboard encourage continuous practice and improvement.

## Tests

### Running Tests

To run the tests, follow these steps:

1. Navigate to the root directory of the project.
2. Run `npm install` to install all necessary dependencies.
3. Use `npm test` to run the test suite.

### Test Coverage

Tests cover various aspects of the application, including:

- User authentication flows
- API endpoints
- Typing test functionality
- Database interactions

## User Flow

1. **Sign Up / Log In**: Users create an account or log in to their existing account.
2. **Start Typing Test**: Once logged in, users navigate to the game page and start typing to begin the typing test.
3. **Typing Test**: Users type the words displayed on the screen within the 60-second timer. The app tracks correct and incorrect words.
4. **View Results**: After the timer ends, users can see their WPM and accuracy percentage.
5. **Leaderboard**: Users can view the leaderboard to see the top scores and where they rank.

## API

WordX utilizes the Simple-SpellChecker API to validate the typed words. The API is integrated to ensure real-time feedback on the correctness of the words typed by the users
### API Endpoints

- `POST /signup` - Creates a new user account
- `POST /login` - Authenticates a user
- `POST /score` - Submits a user's score
- `GET /leaderboard` - Retrieves the top 10 scores

### Notes on the API

The custom API endpoints are designed to ensure secure and efficient handling of user data and scores. They follow RESTful principles and are documented for ease of integration and testing.

## Technology Stack

### Frontend

- HTML, CSS, JavaScript
- React
- Bootstrap for styling

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### APIs
- Simple-SpellChecker API (https://www.npmjs.com/package/simple-spellchecker)
- Custom RESTful APIs for user and score management
### TESTS 

 ## Login 
    Test Case 1: Empty Username
      Input: Click on the login button without entering a username.
      Expected Output: User should notice an error indicating that the username is required.

    Test Case 2: Empty Password
      Input: Enter a valid username and click on the login button without entering a password.
      Expected Output: User should notice an error indicating that the password is required.

    Test Case 3: Invalid Username
      Input: Enter an invalid username (one that does not exist in the database) and a valid password. Click on the login button.
      Expected Output: User should notice an error indicating that the username is incorrect or not found.

    Test Case 4: Invalid Password
      Input: Enter a valid username and an incorrect password for that username. Click on the login button.
      Expected Output: User should notice an error indicating that the password is incorrect.

    Test Case 5: Successful Login
      Input: Enter a valid username and the correct password associated with that username. Click on the login button.
      Expected Output: User should be redirected to the game screen/dashboard as specified in your application flow.
 ## Sign up
    Test Case 1: Empty Fields
      Input: Click on the signup button without entering any details.
      Expected Output: User should notice errors on username, email, and password fields indicating they are required.

    Test Case 2: Invalid Email
      Input: Enter a valid username, an invalid email format, and a valid password. Click on the signup button.
      Expected Output: User should notice an error indicating the email format is incorrect.

    Test Case 3: Password Too Short
      Input: Enter a valid username, a valid email, and a password that is too short (e.g., less than 6 characters). Click on the signup button.
      Expected Output: User should notice an error indicating the password is too short and must be at least 6 characters long.

    Test Case 4: Username Already Taken
      Input: Enter a username that already exists in the database, a valid email, and a valid password. Click on the signup button.
      Expected Output: User should notice an error indicating the username is already taken.

    Test Case 5: Successful Signup
      Input: Enter a valid, unique username, a valid email, and a valid password. Click on the signup button.
      Expected Output: User should be redirected to the login page or logged in automatically and redirected to the game screen, depending on your application's flow.
 ## Game 
    Test Case 1: Access Without Login
      Input: Attempt to access the game page URL directly without logging in.
      Expected Output: User should notice a redirection to the login page or an error message indicating that login is required.

    Test Case 2: Start Game
      Input: Click on the start button to begin the game.
      Expected Output: User should notice the timer starting to count down from 60 seconds, and the text box should become active for user input.

    Test Case 3: Typing Words
      Input: Start typing words into the text box as the timer counts down.
      Expected Output: User should notice words being counted and checked for spelling errors. Correct and incorrect words should be tracked.

    Test Case 4: End of Game
      Input: Allow the timer to reach zero or manually stop the game (if applicable).
      Expected Output: User should notice the display of results, including the number of correct and incorrect words, words per minute, and percentage correct.

    Test Case 5: View Leaderboard
      Input: After completing the game, view the leaderboard to see the top scores.
      Expected Output: User should notice the leaderboard displaying the top 10 best scores with usernames, their scores  (percent), and words per minute.

## Additional Information

- The project is organized with the frontend and backend components neatly separated.
- CSS files are located in the `src` folder within the `public` directory.
- HTML files for different pages (login, signup, game) are also located in the `public` directory.

## Github Link 
    https://github.com/Jasonturnerj/WordX