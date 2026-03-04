const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendorProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'VendorProfile', required: true },
    eventRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'EventRequest', required: true },
    price: { type: Number, required: true, min: 0 },
    serviceBreakdown: { type: String, required: true, trim: true },
    timeline: { type: String, required: true, trim: true },
    additionalNotes: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
