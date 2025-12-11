const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transferRoutes = require('./routes/transfers');
const uploadRoutes = require('./routes/upload');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors({
 origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);

// Health check with database connection test
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      status: 'OK', 
      database: 'Connected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV 
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'Error', 
      database: 'Disconnected',
      error: error.message 
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'WEPRESENT File Sharing API',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use( (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

module.exports = app;