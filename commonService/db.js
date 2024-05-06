const connectDB = (mongoose) => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
     
    });
    console.log('Authentication Database connected');
  } catch (error) {
    console.error('Authentication Database connection error:', error);
  }
};

module.exports = connectDB;
