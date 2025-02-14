const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./auth'); 

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection


app.use('/api/auth', authRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
