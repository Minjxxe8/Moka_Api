const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
const userRoutes = require("./src/routes/UserRoutes");
const ingredientRoutes = require("./src/routes/IngredientRoutes");
const fridgeRoutes = require("./src/routes/FridgeRoutes");

userRoutes(app);
ingredientRoutes(app)
fridgeRoutes(app)

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