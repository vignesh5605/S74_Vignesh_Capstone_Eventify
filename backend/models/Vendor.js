const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vendor name is required'],
    trim: true,
    maxlength: [100, 'Vendor name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Photographer', 'Caterer', 'Decorator', 'Venue', 'Event Manager'],
      message: '{VALUE} is not a valid category'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  priceRange: {
    type: String,
    required: [true, 'Price range is required'],
    enum: {
      values: ['Budget', 'Standard', 'Premium', 'Luxury'],
      message: '{VALUE} is not a valid price range'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

vendorSchema.index({ category: 1 });

module.exports = mongoose.model('Vendor', vendorSchema);
