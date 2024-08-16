require('../alias-config')
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('@common/authMiddleware');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Get the current user
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
