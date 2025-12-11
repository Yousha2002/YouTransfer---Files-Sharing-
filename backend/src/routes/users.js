const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Get user profile
router.get('/profile', auth, userController.getUserProfile);

// Update user profile
router.put('/profile', auth, userController.updateUserProfile);

// Change password
router.put('/change-password', auth, userController.changePassword);

// Get user stats
router.get('/stats', auth, userController.getUserStats);

module.exports = router;