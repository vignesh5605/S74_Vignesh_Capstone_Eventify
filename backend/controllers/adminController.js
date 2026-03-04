const User = require('../models/User');
const VendorProfile = require('../models/VendorProfile');
const Booking = require('../models/Booking');
const EventRequest = require('../models/EventRequest');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAnalytics = catchAsync(async (req, res) => {
  const [users, vendors, bookings, events] = await Promise.all([
    User.countDocuments(),
    VendorProfile.countDocuments(),
    Booking.countDocuments(),
    EventRequest.countDocuments()
  ]);

  res.status(200).json({ success: true, data: { users, vendors, bookings, events } });
});

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find().select('-password').sort('-createdAt');
  res.status(200).json({ success: true, data: users });
});

exports.approveVendor = catchAsync(async (req, res, next) => {
  const profile = await VendorProfile.findById(req.params.id);
  if (!profile) return next(new AppError('Vendor profile not found.', 404));

  profile.approved = true;
  await profile.save();
  res.status(200).json({ success: true, data: profile });
});
