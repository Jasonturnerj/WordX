
    wordx is an interactive web application designed to help users improve their typing accuracy and speed. The app allows users to type out words displayed on the screen, tracks  the number of correctly and incorrectly typed words, and calculates the words per minute (WPM) and accuracy percentage. It also features a leaderboard to showcase top scores.

Features
    Real-time Typing Test: Tracks typing speed and accuracy in real-time.
    60-Second Timer: Users have 60 seconds to type as many words as possible.
    Leaderboard: Displays top 10 scores with usernames, percentages, and WPM.
    User Authentication: Users can sign up, log in, and have their scores saved to their   profiles.
    Responsive Design: Ensures the app is usable on various devices.
    These features were chosen to create a comprehensive and engaging experience for users looking to improve their typing skills. The real-time feedback and competitive leaderboard encourage continuous practice and improvement.

Tests
    Running Tests
    To run the tests, follow these steps:

    Navigate to the root directory of the project.
    Run npm install to install all necessary dependencies.
    Use npm test to run the test suite.
    Tests cover various aspects of the application, including:

User authentication flows
    API endpoints
    Typing test functionality
    Database interactions
User Flow
    Sign Up / Log In: Users create an account or log in to their existing account.
    Start Typing Test: Once logged in, users navigate to the game page and start typing to begin the typing test.
    Typing Test: Users type the words displayed on the screen within the 60-second timer. The app tracks correct and incorrect words.
    View Results: After the timer ends, users can see their WPM and accuracy percentage.
    Leaderboard: Users can view the leaderboard to see the top scores and where they rank.
API
    wordx utilizes the Simple-SpellChecker API to validate the typed words. The API is integrated to ensure real-time feedback on the correctness of the words typed by the users. The backend of the app also features custom APIs for user authentication and leaderboard management.

API Endpoints
    POST /api/signup - Creates a new user account
    POST /api/login - Authenticates a user
    POST /api/score - Submits a user's score
    GET /api/leaderboard - Retrieves the top 10 scores
Notes on the API
    The custom API endpoints are designed to ensure secure and efficient handling of user data  and scores. They follow RESTful principles and are documented for ease of integration and testing.

Technology Stack
Frontend:
    HTML, CSS, JavaScript
    React
    Bootstrap for styling
Backend:
    Node.js
    Express.js
Database:
    PostgreSQL
APIs:
    Simple-SpellChecker API
    Custom RESTful APIs for user and score management.