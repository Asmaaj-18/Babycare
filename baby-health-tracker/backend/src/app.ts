import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { prisma } from './prisma/prisma';

// Routes
import authRoutes from './routes/auth.routes';
import babyRoutes from './routes/baby.routes';
import sleepRoutes from './routes/sleep.routes';
import growthRoutes from './routes/growth.routes';
import vaccineRoutes from './routes/vaccines.routes';
import commentRoutes from './routes/comments.routes';

// Error middlewares
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////////////
// GLOBAL MIDDLEWARES
//////////////////////////////////////////////////////

app.use(cors({
  origin:"https://babycare-zeta.vercel.app/",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],

}));

app.use(express.json());
app.use(cookieParser()); 

//////////////////////////////////////////////////////
// API ROUTES
//////////////////////////////////////////////////////

app.use('/api/auth', authRoutes);
app.use('/api/babies', babyRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/growth', growthRoutes);
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/comments', commentRoutes);
//////////////////////////////////////////////////////
// HEALTH CHECK
//////////////////////////////////////////////////////

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});



//////////////////////////////////////////////////////
// GLOBAL ERROR HANDLER
//////////////////////////////////////////////////////

app.use(errorHandler);

//////////////////////////////////////////////////////
// GRACEFUL SHUTDOWN
//////////////////////////////////////////////////////

process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
