// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  enrollmentNo: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfAdmission: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Student', StudentSchema);
