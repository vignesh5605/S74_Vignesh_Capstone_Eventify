const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/', protect, authorize('customer'), [body('booking').notEmpty(), body('rating').isInt({ min: 1, max: 5 }), body('comment').notEmpty()], validate, reviewController.createReview);
router.get('/vendor/:id', reviewController.getReviewsByVendor);

module.exports = router;
