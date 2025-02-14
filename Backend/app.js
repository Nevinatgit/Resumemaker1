const express = require('express');
const multer = require('multer');  // For handling file uploads
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./auth');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve the uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/resumeRoutes', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
