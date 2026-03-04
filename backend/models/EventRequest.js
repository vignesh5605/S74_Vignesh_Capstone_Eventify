const mongoose = require('mongoose');

const eventRequestSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventTitle: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true, min: 1 },
    budgetMin: { type: Number, required: true, min: 0 },
    budgetMax: { type: Number, required: true, min: 0 },
    servicesRequired: [{ type: String, required: true }],
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EventRequest', eventRequestSchema);
