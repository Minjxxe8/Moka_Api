const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:5173', 'https://monsite.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permet l'envoi de cookies
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Routes
//app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// Route test
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

// If route not found
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

module.exports = app;