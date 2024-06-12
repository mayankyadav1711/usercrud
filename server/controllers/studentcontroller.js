// controllers/studentController.js
const Student = require('../models/Student');

// Add a student
exports.addStudent = async (req, res) => {
  const { name, email, phoneNumber, enrollmentNo, dateOfAdmission } = req.body;
  
  try {
    let student = new Student({
      name,
      email,
      phoneNumber,
      enrollmentNo,
      dateOfAdmission
    });

    student = await student.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single student by ID
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  const { name, email, phoneNumber, enrollmentNo, dateOfAdmission } = req.body;
  
  const studentFields = { name, email, phoneNumber, enrollmentNo, dateOfAdmission };

  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json({ msg: 'Student removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server Error');
  }
};

