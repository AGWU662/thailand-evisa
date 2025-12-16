const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDatabase = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDatabase();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded documents)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Thailand eVisa API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            applications: '/api/applications',
            upload: '/api/upload'
        }
    });
});

// Error handler (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🇹🇭  THAILAND E-VISA API SERVER                         ║
║                                                           ║
║   Server running in ${process.env.NODE_ENV || 'development'} mode                        ║
║   Port: ${PORT}                                             ║
║   URL: http://localhost:${PORT}                            ║
║                                                           ║
║   API Endpoints:                                          ║
║   - Auth: http://localhost:${PORT}/api/auth                ║
║   - Applications: http://localhost:${PORT}/api/applications ║
║   - Uploads: http://localhost:${PORT}/api/upload           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`❌ Error: ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;
