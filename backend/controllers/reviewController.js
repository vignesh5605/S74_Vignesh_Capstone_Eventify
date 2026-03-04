const Review = require('../models/Review');
const VendorProfile = require('../models/VendorProfile');
const Booking = require('../models/Booking');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.body.booking);
  if (!booking) return next(new AppError('Booking not found.', 404));
  if (String(booking.customer) !== String(req.user._id)) return next(new AppError('Unauthorized booking review.', 403));

  const profile = await VendorProfile.findOne({ user: booking.vendor });
  if (!profile) return next(new AppError('Vendor profile not found.', 404));

  const review = await Review.create({
    ...req.body,
    customer: req.user._id,
    vendor: booking.vendor,
    vendorProfile: profile._id
  });

  const stats = await Review.aggregate([
    { $match: { vendorProfile: profile._id } },
    { $group: { _id: '$vendorProfile', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  profile.rating = stats[0]?.avg || 0;
  profile.reviewsCount = stats[0]?.count || 0;
  await profile.save();

  res.status(201).json({ success: true, data: review });
});

exports.getReviewsByVendor = catchAsync(async (req, res) => {
  const profile = await VendorProfile.findOne({ user: req.params.id });
  if (!profile) return res.status(200).json({ success: true, data: [] });

  const reviews = await Review.find({ vendorProfile: profile._id })
    .populate('customer', 'name')
    .sort('-createdAt');

  res.status(200).json({ success: true, data: reviews });
});
