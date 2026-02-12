const Vendor = require('../models/Vendor');
const mockData = require('../data/mockData');

const getVendors = async (req, res, next) => {
  try {
    // Use mock data if MongoDB is not available
    if (global.USE_MOCK_DATA) {
      let vendors = mockData.vendors;
      
      if (req.query.category) {
        vendors = vendors.filter(v => v.category === req.query.category);
      }
      
      return res.status(200).json({
        success: true,
        count: vendors.length,
        data: vendors
      });
    }
    
    // Use MongoDB
    const query = {};
    
    if (req.query.category) {
      query.category = req.query.category;
    }

    const vendors = await Vendor.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors
    });
  } catch (error) {
    next(error);
  }
};

const getVendorById = async (req, res, next) => {
  try {
    // Use mock data if MongoDB is not available
    if (global.USE_MOCK_DATA) {
      const vendor = mockData.vendors.find(v => v._id === req.params.id);
      
      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: 'Vendor not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: vendor
      });
    }
    
    // Use MongoDB
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid vendor ID format'
      });
    }
    next(error);
  }
};

module.exports = {
  getVendors,
  getVendorById
};
