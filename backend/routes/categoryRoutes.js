const express = require('express');
const Category = require('../models/Category');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
  const categories = await Category.find().sort('name');
  res.status(200).json({ success: true, data: categories });
}));

module.exports = router;
