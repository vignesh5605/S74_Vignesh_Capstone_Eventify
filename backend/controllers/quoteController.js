const QuoteRequest = require('../models/QuoteRequest');
const Vendor = require('../models/Vendor');
const mockData = require('../data/mockData');

const createQuoteRequest = async (req, res, next) => {
  try {
    const { userName, eventType, eventDate, requirements, vendorId } = req.body;

    // Use mock data if MongoDB is not available
    if (global.USE_MOCK_DATA) {
      const vendorExists = mockData.vendors.find(v => v._id === vendorId);
      
      if (!vendorExists) {
        return res.status(404).json({
          success: false,
          message: 'Vendor not found. Cannot create quote request.'
        });
      }
      
      // Validate event date is in the future
      if (new Date(eventDate) <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Event date must be in the future'
        });
      }
      
      const newQuote = {
        _id: String(mockData.quoteIdCounter()),
        userName,
        eventType,
        eventDate: new Date(eventDate),
        requirements,
        vendorId: {
          _id: vendorExists._id,
          name: vendorExists.name,
          category: vendorExists.category
        },
        status: 'pending',
        createdAt: new Date()
      };
      
      mockData.quotes.push(newQuote);
      
      return res.status(201).json({
        success: true,
        message: 'Quote request submitted successfully',
        data: newQuote
      });
    }

    // Use MongoDB
    const vendorExists = await Vendor.findById(vendorId);
    
    if (!vendorExists) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found. Cannot create quote request.'
      });
    }

    const quoteRequest = await QuoteRequest.create({
      userName,
      eventType,
      eventDate,
      requirements,
      vendorId,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: quoteRequest
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid vendor ID format'
      });
    }
    
    next(error);
  }
};

const getQuoteRequests = async (req, res, next) => {
  try {
    // Use mock data if MongoDB is not available
    if (global.USE_MOCK_DATA) {
      return res.status(200).json({
        success: true,
        count: mockData.quotes.length,
        data: mockData.quotes
      });
    }
    
    // Use MongoDB
    const quotes = await QuoteRequest.find()
      .populate('vendorId', 'name category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuoteRequest,
  getQuoteRequests
};
