const express = require('express');
const { body } = require('express-validator');
const vendorController = require('../controllers/vendorController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', vendorController.getVendors);
router.get('/:id', vendorController.getVendorById);

router.post(
  '/profile',
  protect,
  authorize('vendor'),
  upload.array('portfolioImages', 8),
  [body('description').notEmpty(), body('location').notEmpty(), body('startingPrice').isNumeric(), body('category').notEmpty()],
  validate,
  vendorController.createVendorProfile
);

router.put('/profile', protect, authorize('vendor'), upload.array('portfolioImages', 8), vendorController.updateVendorProfile);

module.exports = router;
