const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens

// Function to generate a JWT token
// This token will be sent to the client upon successful login/registration
// and used for authenticating subsequent requests.
const generateToken = (id) => {
    // Sign the token with the user's ID and a secret key from environment variables.
    // The token expires in 1 hour for security.
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: '1h',
    });
};

// Handles user registration
exports.register = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Check if a user with the provided email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create a new user instance
        const user = new User({ email, password });
        // Save the new user to the database. The pre-save hook in the User model will hash the password.
        await user.save();

        // Generate a JWT token for the newly registered user
        const token = generateToken(user._id);

        // Send success response with user ID, email, and the generated token
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: token,
            message: 'Registration successful'
        });
    } catch (error) {
        // Handle validation errors or other database errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// Handles user login
exports.login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' }); // User not found
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' }); // Passwords do not match
        }

        // Generate a JWT token for the logged-in user
        const token = generateToken(user._id);

        // Send success response with user ID, email, and the generated token
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: token,
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};
