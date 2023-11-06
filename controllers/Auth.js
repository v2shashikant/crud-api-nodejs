// controllers/authController.js

const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// User registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    const userFind = await User.findOne({ email });
    if (userFind) {
      return res.status(401).json({ error: 'Email is already register.' });
    }

    const user = new User({ name, email, password });

    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not find' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // You should define this secret in your environment variables
      { expiresIn: '1h' } // Adjust the expiration time as needed
    );

    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};


exports.forgetPassword = async (req,res) => {
  
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique token for resetting password (this token will be sent to the user's email)
    const resetToken = user.generatePasswordResetToken();
    // Save the token and expiration time in the user object (in the database)
    await user.save();

    // Send email with the reset link
    const testAccount = await nodemailer.createTestAccount();

    // Create a nodemailer transporter using the Ethereal test account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const mailOptions = {
      from: 'shashikant.chauhan@yopmail.com',
      to: user.email,
      subject: 'Password Reset Link',
      text: `To reset your password, click this link: http://localhost:/${resetToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Password reset link sent to your email' });
      }
    });
    res.status(200).json({ message: 'Password reset link sent to your email' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

exports.resetPassword = async (req,res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token. Please request a new password reset.' });
    }

    // Update the user's password and reset the token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }

}