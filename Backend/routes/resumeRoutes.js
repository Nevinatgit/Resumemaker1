const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Resume,Token,Image } = require('../model');
const User = require('../model')
const multer = require('multer');
const path = require('path');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Correct header key is lowercase 'authorization'
  console.log("sfd")
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'
 
  if (!token) {
    return res.status(401).json({ message: 'Token missing or malformed' });
  }
  console.log(token)
  try {
    const decoded = jwt.verify(token, "pass");  // Verify the token
    req.user = decoded;  // Attach decoded token payload to the request object
    
    next();  // Call the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as the filename
  }
});

const upload = multer({ storage: storage });

// Serve static files from 'uploads' folder
router.use('/uploads', express.static('uploads'));

// Route to upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
  console.log("sdfsdf")
  const formData=req.body
  console.log(formData)
  const decoded = jwt.verify(req.body.Token, "pass");  // Verify the token
    req.user = decoded;
  const username=req.user.username
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  
  try {
    const newImage = new Image({
      username: username,
      id:formData.Id,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    });
    await newImage.save();

    // Return the image URL from the database
    res.send({
      imageUrl: newImage.imageUrl,
    });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).send('Error uploading image');
  }
});



router.get('/GetImage',async (req,res)=>{
  const username=req.query
  console.log(username.id,"once")
  const image = await Image.findOne({username:username.username,id:username.id})
  console.log(image)
  if (image) {
    return res.status(200).json({ image:image});
  }
})

router.get('/GetResumeUser',authenticateUser,async (req,res)=>{
  const {username} = req.query;
  console.log("getresume",username)
  const existingResume = await Resume.find({ username: username});
 
  if (existingResume) {
    return res.status(200).json({ success: true, existingResume:existingResume});
  }

})
router.post('/saveResume',authenticateUser, async (req, res) => {
  const { resumeState,resumetemplate} = req.body;
 
  // Basic validation: Ensure all the necessary fields are present
  if (!resumeState || !resumeState.about || !resumeState.experience || !resumeState.skills) {
    
    return res.status(400).json({ message: 'Invalid resume state, missing required fields' });
  }

  try {
   
    const username=req.user.username
    console.log(username)
    const newResume = new Resume({
      username:username ,
      resumeState,
      resumetemplate:resumetemplate
    });

    await newResume.save();

    // Send success response
    res.status(201).json({ success: true, message: 'Resume saved successfully' });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router; 