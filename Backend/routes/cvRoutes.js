const express = require('express');
const router = express.Router();

// Define routes related to the "User" section
router.get('/profile', (req, res) => {
  res.send('User Profile');
});

router.get('/settings', (req, res) => {
  res.send('User Settings');
});

module.exports = router; // Export the router
