const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        lowercase: true, // Stores emails in lowercase
        trim: true, // Removes whitespace from both ends of a string
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'] // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets creation date
    }
});

// Pre-save hook to hash the password before saving a new user
// This ensures that plain text passwords are never stored in the database.
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Generate a salt with 10 rounds (cost factor)
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        // Pass any errors to the next middleware
        next(error);
    }
});

// Method to compare a given password with the hashed password in the database
UserSchema.methods.comparePassword = async function(candidatePassword) {
    // Use bcrypt to compare the candidate password with the stored hashed password
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);