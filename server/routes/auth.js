const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/admincontroller');
const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: AdminAuth
 *   description: Authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new admin
 *     tags: [AdminAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request
 */


router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    signup(req, res);
  }
);


/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Authenticate an admin and get token
 *     tags: [AdminAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Admin authenticated successfully
 *       400:
 *         description: Invalid credentials
 */


router.post(
  '/signin',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    signin(req, res);
  }
);

module.exports = router;
