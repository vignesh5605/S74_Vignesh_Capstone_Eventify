const Booking = require('../models/Booking');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getBookings = catchAsync(async (req, res) => {
  const filter = req.user.role === 'customer' ? { customer: req.user._id } : req.user.role === 'vendor' ? { vendor: req.user._id } : {};
  const bookings = await Booking.find(filter)
    .populate('customer', 'name')
    .populate('vendor', 'name')
    .populate('eventRequest', 'eventTitle date location')
    .sort('-createdAt');

  res.status(200).json({ success: true, data: bookings });
});

exports.updateBookingStatus = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return next(new AppError('Booking not found.', 404));

  booking.status = req.body.status;
  await booking.save();

  res.status(200).json({ success: true, data: booking });
});
