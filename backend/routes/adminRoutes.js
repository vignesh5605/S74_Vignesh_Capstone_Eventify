const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect, authorize('admin'));

router.get('/users', adminController.getUsers);
router.get('/analytics', adminController.getAnalytics);
router.patch('/vendors/:id/approve', adminController.approveVendor);

module.exports = router;
