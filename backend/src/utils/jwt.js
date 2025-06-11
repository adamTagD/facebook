const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variable for production

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = {
    generateToken,
    verifyToken,
};