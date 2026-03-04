const VendorProfile = require('../models/VendorProfile');
const Category = require('../models/Category');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getVendors = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, search = '', category, location, minPrice, maxPrice, rating } = req.query;
  const filter = { approved: true };

  if (location) filter.location = { $regex: location, $options: 'i' };
  if (minPrice || maxPrice) filter.startingPrice = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
  if (rating) filter.rating = { $gte: Number(rating) };

  if (category) {
    const categoryDoc = await Category.findOne({ name: { $regex: `^${category}$`, $options: 'i' } });
    if (categoryDoc) filter.category = categoryDoc._id;
  }

  const query = VendorProfile.find(filter)
    .populate('user', 'name')
    .populate('category', 'name')
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .sort('-createdAt');

  if (search) {
    query.find({ $or: [{ description: { $regex: search, $options: 'i' } }, { location: { $regex: search, $options: 'i' } }] });
  }

  const vendors = await query;
  const total = await VendorProfile.countDocuments(filter);

  res.status(200).json({ success: true, page: Number(page), total, data: vendors });
});

exports.getVendorById = catchAsync(async (req, res, next) => {
  const vendor = await VendorProfile.findById(req.params.id).populate('user', 'name email').populate('category', 'name');
  if (!vendor) return next(new AppError('Vendor profile not found.', 404));
  return res.status(200).json({ success: true, data: vendor });
});

exports.createVendorProfile = catchAsync(async (req, res, next) => {
  const existing = await VendorProfile.findOne({ user: req.user._id });
  if (existing) return next(new AppError('Vendor profile already exists.', 400));

  const images = req.files?.map((file) => file.path) || [];
  const profile = await VendorProfile.create({ ...req.body, user: req.user._id, portfolioImages: images });

  return res.status(201).json({ success: true, data: profile });
});

exports.updateVendorProfile = catchAsync(async (req, res, next) => {
  const profile = await VendorProfile.findOne({ user: req.user._id });
  if (!profile) return next(new AppError('Vendor profile not found.', 404));

  const images = req.files?.map((file) => file.path) || [];
  if (images.length) req.body.portfolioImages = [...profile.portfolioImages, ...images];

  Object.assign(profile, req.body);
  await profile.save();

  return res.status(200).json({ success: true, data: profile });
});
