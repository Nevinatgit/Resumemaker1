const express = require('express');
const router = express.Router();
const { User, Resume,Token } = require('./model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email or username already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email or username already exists' });
  }

  // Create a new user
  const newUser = new User({ username, email, password });
  await newUser.save();

  // Send success response
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Check if the password matches
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Send success response
  const token = jwt.sign({ username, password }, "pass", { expiresIn: '1h' });
  const Tokens = new Token({ username, token });
  await Tokens.save();

  res.status(200).json({ success: true, message: 'Login successful',token:token });
});


module.exports = router; // Export the router
