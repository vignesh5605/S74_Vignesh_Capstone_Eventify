// In-memory data store as fallback when MongoDB is unavailable
const vendors = [
  {
    _id: '1',
    name: 'Capture Moments Studio',
    category: 'Photographer',
    description: 'Professional wedding and event photography with 10+ years of experience. Specializing in candid shots, cinematic videos, and drone coverage.',
    location: 'Mumbai, Maharashtra',
    priceRange: 'Premium',
    createdAt: new Date('2024-01-01')
  },
  {
    _id: '2',
    name: 'PixelPerfect Photography',
    category: 'Photographer',
    description: 'Creative photography solutions for all events. We bring your memories to life with stunning visuals and timely delivery.',
    location: 'Bangalore, Karnataka',
    priceRange: 'Standard',
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '3',
    name: 'Lens & Light Studios',
    category: 'Photographer',
    description: 'Award-winning photographers offering luxury photography packages with same-day edits and premium albums.',
    location: 'Delhi NCR',
    priceRange: 'Luxury',
    createdAt: new Date('2024-02-01')
  },
  {
    _id: '4',
    name: 'Royal Feast Caterers',
    category: 'Caterer',
    description: 'Multi-cuisine catering for weddings and corporate events. Serving delicious food with impeccable presentation for 500+ guests.',
    location: 'Chennai, Tamil Nadu',
    priceRange: 'Premium',
    createdAt: new Date('2024-02-15')
  },
  {
    _id: '5',
    name: 'Spice Route Catering',
    category: 'Caterer',
    description: 'Authentic Indian cuisine specialists. We offer traditional recipes with modern presentation for all event sizes.',
    location: 'Hyderabad, Telangana',
    priceRange: 'Standard',
    createdAt: new Date('2024-03-01')
  },
  {
    _id: '6',
    name: 'Budget Bites Catering',
    category: 'Caterer',
    description: 'Affordable catering solutions without compromising taste. Perfect for budget-conscious events with quality food.',
    location: 'Pune, Maharashtra',
    priceRange: 'Budget',
    createdAt: new Date('2024-03-10')
  },
  {
    _id: '7',
    name: 'Elegance Decor Studio',
    category: 'Decorator',
    description: 'Transform your venue into a magical space. Specializing in floral arrangements, lighting design, and thematic decorations.',
    location: 'Mumbai, Maharashtra',
    priceRange: 'Luxury',
    createdAt: new Date('2024-03-20')
  },
  {
    _id: '8',
    name: 'Dream Decorations',
    category: 'Decorator',
    description: 'Creative decoration solutions for weddings, birthdays, and corporate events. Custom themes and budget-friendly packages.',
    location: 'Bangalore, Karnataka',
    priceRange: 'Standard',
    createdAt: new Date('2024-04-01')
  },
  {
    _id: '9',
    name: 'Festive Vibes Decor',
    category: 'Decorator',
    description: 'Vibrant and colorful decorations that bring life to any celebration. Balloon art, fabric draping, and stage design.',
    location: 'Kolkata, West Bengal',
    priceRange: 'Budget',
    createdAt: new Date('2024-04-10')
  },
  {
    _id: '10',
    name: 'Grand Palace Banquet',
    category: 'Venue',
    description: 'Luxurious banquet hall with capacity for 1000+ guests. In-house catering, valet parking, and modern amenities.',
    location: 'Delhi NCR',
    priceRange: 'Luxury',
    createdAt: new Date('2024-04-20')
  },
  {
    _id: '11',
    name: 'Garden View Resort',
    category: 'Venue',
    description: 'Beautiful outdoor venue with landscaped gardens. Perfect for destination weddings and intimate gatherings.',
    location: 'Jaipur, Rajasthan',
    priceRange: 'Premium',
    createdAt: new Date('2024-05-01')
  },
  {
    _id: '12',
    name: 'City Convention Center',
    category: 'Venue',
    description: 'Versatile venue space for conferences, exhibitions, and social events. Multiple halls with AV equipment.',
    location: 'Hyderabad, Telangana',
    priceRange: 'Standard',
    createdAt: new Date('2024-05-10')
  },
  {
    _id: '13',
    name: 'Elite Events Management',
    category: 'Event Manager',
    description: 'Full-service event planning and execution. From concept to completion, we handle every detail of your special day.',
    location: 'Mumbai, Maharashtra',
    priceRange: 'Luxury',
    createdAt: new Date('2024-05-20')
  },
  {
    _id: '14',
    name: 'Celebrate With Us',
    category: 'Event Manager',
    description: 'Professional event coordinators specializing in weddings and corporate events. Stress-free planning guaranteed.',
    location: 'Bangalore, Karnataka',
    priceRange: 'Premium',
    createdAt: new Date('2024-06-01')
  },
  {
    _id: '15',
    name: 'Perfect Planners',
    category: 'Event Manager',
    description: 'Experienced team delivering memorable events within your budget. Vendor coordination, timeline management, and on-site supervision.',
    location: 'Chennai, Tamil Nadu',
    priceRange: 'Standard',
    createdAt: new Date('2024-06-10')
  }
];

let quotes = [];
let quoteIdCounter = 1;

module.exports = {
  vendors,
  quotes,
  quoteIdCounter: () => quoteIdCounter++
};
