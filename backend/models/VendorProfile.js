const mongoose = require('mongoose');

const vendorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startingPrice: { type: Number, required: true, min: 0 },
    portfolioImages: [{ type: String }],
    availability: { type: String, default: 'Available' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    approved: { type: Boolean, default: false },
    services: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('VendorProfile', vendorProfileSchema);
