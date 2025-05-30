const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, 'yourSuperSecretKey462309', { expiresIn: '1d' });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();

    const token = createToken(user._id);
    res.status(201).json({ message: 'Signup successful', token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = createToken(user._id);
    res.status(200).json({ message: 'Login successful', token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
