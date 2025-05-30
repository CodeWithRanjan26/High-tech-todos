const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');  // Optional: Protect routes if needed

const router = express.Router();

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, 'yourSuperSecretKey462309', { expiresIn: '1d' });
};

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields (name, email, password)' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate token for the new user
    const token = createToken(newUser._id);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { email: newUser.email },
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Debugging: Log the login attempt data
    console.log('Login attempt:', email, password);
    
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Debugging: Log the user retrieved from DB
    console.log('User from DB:', user);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Debugging: Log the stored hashed password in the DB
    console.log('Stored password:', user?.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// PROTECTED ROUTE EXAMPLE (Optional)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Find user by userId (from JWT token)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ email: user.email, name: user.name });
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;
