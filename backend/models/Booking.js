const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'EventRequest', required: true },
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
    finalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
