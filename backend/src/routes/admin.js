const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/users', auth, admin, adminController.getAllUsers);
router.put('/users/:userId/toggle-status', auth, admin, adminController.toggleUserStatus);
router.get('/transfers', auth, admin, adminController.getAllTransfers);
router.put('/transfers/:transferId/expire', auth, admin, adminController.expireTransfer);
router.get('/stats', auth, admin, adminController.getStats);

module.exports = router;