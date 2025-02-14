const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Resume,Token } = require('../model');
const User = require('../model')
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save uploaded files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Correct header key is lowercase 'authorization'
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'
 
  if (!token) {
    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  try {
    const decoded = jwt.verify(token, "pass");  // Verify the token
    req.user = decoded;  // Attach decoded token payload to the request object
    next();  // Call the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};

router.get('/GetResume',authenticateUser,async (req,res)=>{
  console.log("sfgdsg")
  const existingResume = await Resume.findOne({ username: req.user.username});
  console.log(existingResume)
  if (existingResume) {
    return res.status(200).json({ success: true, existingResume:existingResume.resumeState});
  }

})
router.post('/saveResume',authenticateUser, async (req, res) => {
  const { resumeState} = req.body;
  console.log(resumeState)
  // Basic validation: Ensure all the necessary fields are present
  if (!resumeState || !resumeState.about || !resumeState.Experience || !resumeState.skills) {
    
    return res.status(400).json({ message: 'Invalid resume state, missing required fields' });
  }

  try {
    // Check if resume already exists for this user
   
    // If no resume exists for the user, create a new one
    const username=req.user.username
    console.log(username)
    const newResume = new Resume({
      username:username ,
      resumeState
    });

    await newResume.save();

    // Send success response
    res.status(201).json({ success: true, message: 'Resume saved successfully' });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router; // Export the router
