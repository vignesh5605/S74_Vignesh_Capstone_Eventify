const express = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('customer'),
  [
    body('eventTitle').notEmpty(),
    body('eventType').notEmpty(),
    body('location').notEmpty(),
    body('date').isISO8601(),
    body('numberOfGuests').isInt({ min: 1 }),
    body('budgetMin').isNumeric(),
    body('budgetMax').isNumeric(),
    body('servicesRequired').isArray({ min: 1 }),
    body('description').notEmpty()
  ],
  validate,
  eventController.createEvent
);

router.get('/', protect, eventController.getEvents);
router.get('/:id', protect, eventController.getEventById);

module.exports = router;
