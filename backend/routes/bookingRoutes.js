const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', protect, bookingController.getBookings);
router.patch('/:id/status', protect, [body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled'])], validate, bookingController.updateBookingStatus);

module.exports = router;
