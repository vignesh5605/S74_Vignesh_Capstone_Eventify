const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }), body('role').optional().isIn(['customer', 'vendor', 'admin'])],
  validate,
  authController.register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, authController.login);

module.exports = router;
