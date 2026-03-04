const mongoose = require('mongoose');

module.exports = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  // eslint-disable-next-line no-console
  console.log(`MongoDB connected: ${conn.connection.host}`);
};
