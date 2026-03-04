const EventRequest = require('../models/EventRequest');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createEvent = catchAsync(async (req, res) => {
  const event = await EventRequest.create({ ...req.body, customer: req.user._id });
  res.status(201).json({ success: true, data: event });
});

exports.getEvents = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, eventType, location } = req.query;
  const filter = {};
  if (req.user.role === 'customer') filter.customer = req.user._id;
  if (eventType) filter.eventType = { $regex: eventType, $options: 'i' };
  if (location) filter.location = { $regex: location, $options: 'i' };

  const events = await EventRequest.find(filter)
    .populate('customer', 'name email')
    .sort('-createdAt')
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await EventRequest.countDocuments(filter);
  res.status(200).json({ success: true, page: Number(page), total, data: events });
});

exports.getEventById = catchAsync(async (req, res, next) => {
  const event = await EventRequest.findById(req.params.id).populate('customer', 'name email');
  if (!event) return next(new AppError('Event not found.', 404));
  return res.status(200).json({ success: true, data: event });
});
