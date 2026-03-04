const Quote = require('../models/Quote');
const Booking = require('../models/Booking');
const EventRequest = require('../models/EventRequest');
const VendorProfile = require('../models/VendorProfile');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuote = catchAsync(async (req, res, next) => {
  const event = await EventRequest.findById(req.body.eventRequest);
  if (!event) return next(new AppError('Event request not found.', 404));

  const vendorProfile = await VendorProfile.findOne({ user: req.user._id });
  if (!vendorProfile) return next(new AppError('Vendor profile is required to submit quote.', 400));

  const quote = await Quote.create({ ...req.body, vendor: req.user._id, vendorProfile: vendorProfile._id });
  res.status(201).json({ success: true, data: quote });
});

exports.getQuotesByEvent = catchAsync(async (req, res) => {
  const quotes = await Quote.find({ eventRequest: req.params.id })
    .populate('vendor', 'name email')
    .populate('vendorProfile', 'category location rating startingPrice')
    .sort('price');

  res.status(200).json({ success: true, count: quotes.length, data: quotes });
});

exports.acceptQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findById(req.params.id).populate('eventRequest');
  if (!quote) return next(new AppError('Quote not found.', 404));

  if (String(quote.eventRequest.customer) !== String(req.user._id)) {
    return next(new AppError('Only the event owner can accept quote.', 403));
  }

  quote.status = 'accepted';
  await quote.save();

  await Quote.updateMany({ eventRequest: quote.eventRequest._id, _id: { $ne: quote._id } }, { status: 'rejected' });

  const booking = await Booking.create({
    customer: quote.eventRequest.customer,
    vendor: quote.vendor,
    eventRequest: quote.eventRequest._id,
    quote: quote._id,
    finalPrice: quote.price,
    status: 'confirmed'
  });

  res.status(200).json({ success: true, data: { quote, booking } });
});
