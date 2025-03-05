const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB connection
mongoose.connect('mongodb+srv://njlepzaneigk:njlepzaneigk@student.kbu3ywt.mongodb.net/rabbitdb?retryWrites=true&w=majority&appName=student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving a user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create User model
const User = mongoose.model('User', UserSchema);

const resumeSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    ref: 'User' 
  },
  resumeState: {
    about: { type: String, default: '' },
    experience: [{
      jobTitle: { type: String, required: true },
      jobDescription: { type: String, required: true }
    }],
    skills: { type: [String], default: [] }, // Skills array
    softSkills: { type: [String], default: [] }, // Soft skills as array
    language: { type: String, default: '' },
    hobbies: { type: String, default: '' },
    references: [{
      refererName: { type: String, required: true },
      refererDesignation: { type: String, required: true },
      quote: { type: String, required: true }
    }],
    education: [{
      college: { type: String, required: true },
      timeAttended: { type: String, required: true }
    }],
    
  },
  resumetemplate: { 
    type: Number,
    required: true, 
    ref: 'ResumeTemplate' 
  }
});

// Create Resume model
const Resume = mongoose.model('Resume', resumeSchema);

const tokenSchema = new mongoose.Schema({
  username:{type:String},
  token:{type:String}
})
const Token = mongoose.model('Token', tokenSchema);

const imageSchema = new mongoose.Schema({
  username:{ 
    type: String, 
    required: true, 
    
  },
  id:{ 
    type: Number, 
    required: true, 
    
  },
  imageUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);



// Export models
module.exports = { User, Resume,Token,Image };
