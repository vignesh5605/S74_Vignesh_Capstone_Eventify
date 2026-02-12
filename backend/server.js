const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const vendorRoutes = require('./routes/vendorRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Eventify API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/vendors', vendorRoutes);
app.use('/api/quotes', quoteRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let USE_MOCK_DATA = false;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Using MongoDB for data storage');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed, using in-memory data storage');
    console.warn('   (Data will not persist between server restarts)');
    USE_MOCK_DATA = true;
  }
  
  // Make USE_MOCK_DATA accessible globally
  global.USE_MOCK_DATA = USE_MOCK_DATA;
  
  app.listen(PORT, () => {
    console.log(`\n🚀 Eventify Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api\n`);
  });
};

startServer();
