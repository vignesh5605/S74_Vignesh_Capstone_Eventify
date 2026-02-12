const express = require('express');
const router = express.Router();
const { createQuoteRequest, getQuoteRequests } = require('../controllers/quoteController');

router.post('/', createQuoteRequest);

router.get('/', getQuoteRequests);

module.exports = router;
