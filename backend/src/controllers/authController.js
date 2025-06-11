const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};