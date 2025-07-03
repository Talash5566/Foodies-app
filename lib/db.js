import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('⚠️ Please add your Mongo URI to .env.local');
}

let isConnected = false; // Global variable to track connection

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);

    isConnected = true;
    console.log('✅ MongoDB connected:', db.connection.name);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Stop app if DB connection fails
  }
};
