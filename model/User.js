const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
var crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date

});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generatePasswordResetToken = function() {
  // Create a unique token using Node's crypto library
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = token;
  // Set expiration time for the token (e.g., 1 hour)
  this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

  return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
 