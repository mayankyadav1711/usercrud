// routes/student.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phoneNumber
 *         - enrollmentNo
 *         - dateOfAdmission
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the student
 *         name:
 *           type: string
 *           description: Name of the student
 *         email:
 *           type: string
 *           description: Email of the student
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the student
 *         enrollmentNo:
 *           type: string
 *           description: Enrollment number of the student
 *         dateOfAdmission:
 *           type: string
 *           format: date
 *           description: Date of admission of the student
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: john.doe@example.com
 *         phoneNumber: 1234567890
 *         enrollmentNo: 12345
 *         dateOfAdmission: 2023-06-11
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The students managing API
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('enrollmentNo', 'Enrollment number is required').not().isEmpty(),
    check('dateOfAdmission', 'Date of admission is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addStudent(req, res);
  }
);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Server error
 */
router.get('/', (req, res) => {
  getStudents(req, res);
});

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: The student data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.get('/:id', (req, res) => {
  getStudent(req, res);
});

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.put('/:id', (req, res) => {
  updateStudent(req, res);
});

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: The student was successfully deleted
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', (req, res) => {
  deleteStudent(req, res);
});

module.exports = router;
