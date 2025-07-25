// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import suggestRoutes from './routes/suggest.js';
import resumeRoutes from './routes/resume.js';

dotenv.config();

console.log("✅ Loaded API KEY from .env:", process.env.OPENAI_API_KEY);

const app = express(); // ✅ Move this BEFORE using app
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/suggest', suggestRoutes);
app.use('/api/resume', resumeRoutes);

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
