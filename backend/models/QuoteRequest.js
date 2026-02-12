const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    maxlength: [100, 'User name cannot exceed 100 characters']
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: {
      values: ['Wedding', 'Birthday', 'Corporate Event', 'Private Function'],
      message: '{VALUE} is not a valid event type'
    }
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  requirements: {
    type: String,
    required: [true, 'Requirements are required'],
    trim: true,
    maxlength: [2000, 'Requirements cannot exceed 2000 characters']
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'Vendor ID is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'responded'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

quoteRequestSchema.index({ vendorId: 1, status: 1 });

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
