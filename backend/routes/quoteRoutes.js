const express = require('express');
const { body } = require('express-validator');
const quoteController = require('../controllers/quoteController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('vendor'),
  [body('eventRequest').notEmpty(), body('price').isNumeric(), body('serviceBreakdown').notEmpty(), body('timeline').notEmpty()],
  validate,
  quoteController.createQuote
);

router.get('/event/:id', protect, quoteController.getQuotesByEvent);
router.patch('/:id/accept', protect, authorize('customer'), quoteController.acceptQuote);

module.exports = router;
