const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return next(new AppError('Email already registered.', 400));

  const user = await User.create({ name, email, password, role, phone });
  const token = generateToken(user._id, user.role);

  return res.status(201).json({
    success: true,
    token,
    data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password.', 401));
  }

  const token = generateToken(user._id, user.role);
  return res.status(200).json({
    success: true,
    token,
    data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } }
  });
});
