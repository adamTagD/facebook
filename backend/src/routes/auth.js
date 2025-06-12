const express = require('express');
const { register, login } = require('../controllers/authController'); // Import controller functions

const router = express.Router(); // Create a new router instance

// Define the API route for user registration
// When a POST request is made to '/register', the register function from authController will be called.
router.post('/register', register);

// Define the API route for user login
// When a POST request is made to '/login', the login function from authController will be called.
router.post('/login', login);

module.exports = router; // Export the router to be used in app.js
