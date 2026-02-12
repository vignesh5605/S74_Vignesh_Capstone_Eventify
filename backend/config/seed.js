/**
 * Database Seeder
 * 
 * WHY: This script populates the database with sample vendor data
 * for development and demonstration purposes. It ensures the
 * application has realistic data to showcase functionality.
 * 
 * Usage: node config/seed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vendor = require('../models/Vendor');

// Load environment variables
dotenv.config();

// Sample vendor data covering all categories
const vendorData = [
  // Photographers
  {
    name: 'Capture Moments Studio',
    category: 'Photographer',
    description: 'Professional wedding and event photography with 10+ years of experience. Specializing in candid shots, cinematic videos, and drone coverage.',
    location: 'Mumbai, Maharashtra',
    priceRange: 'Premium'
  },
  {
    name: 'PixelPerfect Photography',
    category: 'Photographer',
    description: 'Creative photography solutions for all events. We bring your memories to life with stunning visuals and timely delivery.',
    location: 'Bangalore, Karnataka',
    priceRange: 'Standard'
  },
  {
    name: 'Lens & Light Studios',
    category: 'Photographer',
    description: 'Award-winning photographers offering luxury photography packages with same-day edits and premium albums.',
    location: 'Delhi NCR',
    priceRange: 'Luxury'
  },
  
  // Caterers
  {
    name: 'Royal Feast Caterers',
    category: 'Caterer',
    description: 'Multi-cuisine catering for weddings and corporate events. Serving delicious food with impeccable presentation for 500+ guests.',
    location: 'Chennai, Tamil Nadu',
    priceRange: 'Premium'
  },
  {
    name: 'Spice Route Catering',
    category: 'Caterer',
    description: 'Authentic Indian cuisine specialists. We offer traditional recipes with modern presentation for all event sizes.',
    location: 'Hyderabad, Telangana',
    priceRange: 'Standard'
  },
  {
    name: 'Budget Bites Catering',
    category: 'Caterer',
    description: 'Affordable catering solutions without compromising taste. Perfect for budget-conscious events with quality food.',
    location: 'Pune, Maharashtra',
    priceRange: 'Budget'
  },
  
  // Decorators
  {
    name: 'Elegance Decor Studio',
    category: 'Decorator',
    description: 'Transform your venue into a magical space. Specializing in floral arrangements, lighting design, and thematic decorations.',
    location: 'Mumbai, Maharashtra',
    priceRange: 'Luxury'
  },
  {
    name: 'Dream Decorations',
    category: 'Decorator',
    description: 'Creative decoration solutions for weddings, birthdays, and corporate events. Custom themes and budget-friendly packages.',
    location: 'Bangalore, Karnataka',
    priceRange: 'Standard'
  },
  {
    name: 'Festive Vibes Decor',
    category: 'Decorator',
    description: 'Vibrant and colorful decorations that bring life to any celebration. Balloon art, fabric draping, and stage design.',
    location: 'Kolkata, West Bengal',
    priceRange: 'Budget'
  },
  
  // Venues
  {
    name: 'Grand Palace Banquet',
    category: 'Venue',
    description: 'Luxurious banquet hall with capacity for 1000+ guests. In-house catering, valet parking, and modern amenities.',
    location: 'Delhi NCR',
    priceRange: 'Luxury'
  },
  {
    name: 'Garden View Resort',
    category: 'Venue',
    description: 'Beautiful outdoor venue with landscaped gardens. Perfect for destination weddings and intimate gatherings.',
    location: 'Jaipur, Rajasthan',
    priceRange: 'Premium'
  },
  {
    name: 'City Convention Center',
    category: 'Venue',
    description: 'Versatile venue space for conferences, exhibitions, and social events. Multiple halls with AV equipment.',
    location: 'Hyderabad, Telangana',
    priceRange: 'Standard'
  },
  
  // Event Managers
  {
    name: 'Elite Events Management',
    category: 'Event Manager',
    description: 'Full-service event planning and execution. From concept to completion, we handle every detail of your special day.',
    location: 'Mumbai, Maharashtra',
    priceRange: 'Luxury'
  },
  {
    name: 'Celebrate With Us',
    category: 'Event Manager',
    description: 'Professional event coordinators specializing in weddings and corporate events. Stress-free planning guaranteed.',
    location: 'Bangalore, Karnataka',
    priceRange: 'Premium'
  },
  {
    name: 'Perfect Planners',
    category: 'Event Manager',
    description: 'Experienced team delivering memorable events within your budget. Vendor coordination, timeline management, and on-site supervision.',
    location: 'Chennai, Tamil Nadu',
    priceRange: 'Standard'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing vendors
    await Vendor.deleteMany({});
    console.log('🗑️  Cleared existing vendors');

    // Insert sample vendors
    const insertedVendors = await Vendor.insertMany(vendorData);
    console.log(`✅ Inserted ${insertedVendors.length} vendors`);

    console.log('\n📋 Vendors added:');
    insertedVendors.forEach(vendor => {
      console.log(`   - ${vendor.name} (${vendor.category})`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
