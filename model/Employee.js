const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Create a schema for the Employee model
const employeeSchema = new mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4, // Using UUID v4 for generating unique IDs

  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

// Create a model using the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
