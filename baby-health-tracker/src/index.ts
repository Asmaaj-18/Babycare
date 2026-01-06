import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route DIRECT in index.ts
app.post('/api/test-post', (req, res) => {
  console.log('Test POST route hit! Body:', req.body);
  res.json({ 
    message: 'Test POST successful',
    body: req.body 
  });
});

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, async () => {
  console.log(`?? Server running on port ${PORT}`);
  console.log(`?? Environment: ${process.env.NODE_ENV}`);
  
  try {
    await prisma.$connect();
    console.log('? Database connected successfully');
    
    // Test database connection with a simple query
    const userCount = await prisma.user.count();
    console.log(`?? Database has ${userCount} users`);
  } catch (error) {
    console.error('? Database connection error:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
