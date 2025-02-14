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

// Resume Schema
const resumeSchema = new mongoose.Schema({
  username: { type: String, required: true, ref: 'User' }, // Reference to User
  resumeState: {
    about: { type: String, default: '' },
    experience: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    language: { type: String, default: '' },
    hobbies: { type: String, default: '' },
    references:  { type: [String], default: [] },
    education:  { type: [String], default: [] },
    image: { type: String, default: '' },
  },
 // formatting: {
  //  fontSize: { type: String, default: '16' },
   // isBold: { type: Boolean, default: false },
  //  isItalic: { type: Boolean, default: false },
  //  isUnderlined: { type: Boolean, default: false },
 //   alignment: { type: String, default: 'left' },
  //  textColor: { type: String, default: '#000000' },
  //  highlightColor: { type: String, default: '#FFFF00' },
  //  fontFamily: { type: String, default: 'Arial' },
   // bulletList: { type: Boolean, default: false },
  //  image: { type: String, default: null },
//  },
});

// Create Resume model
const Resume = mongoose.model('Resume', resumeSchema);

const tokenSchema = new mongoose.Schema({
  username:{type:String},
  token:{type:String}
})
const Token = mongoose.model('Token', tokenSchema);

// Export models
module.exports = { User, Resume,Token };
