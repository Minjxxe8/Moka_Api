const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
const userRoutes = require("./src/routes/UserRoutes");
const ingredientRoutes = require("./src/routes/IngredientRoutes");
const fridgeRoutes = require("./src/routes/FridgeRoutes");
const listsIngredientsRoutes = require("./src/routes/ListsRoutes");

userRoutes(app);
ingredientRoutes(app)
fridgeRoutes(app)
listsIngredientsRoutes(app)

// If route not found
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("--- LOG ERREUR ---");
    console.error(err.stack); // Ceci s'affiche dans ton terminal
    console.error("------------------");

    res.status(500).json({
        message: 'Erreur détectée',
        error: err.message,   // <--- IMPORTANT : affiche le message (ex: "invalid input syntax for type uuid")
        stack: err.stack      // <--- IMPORTANT : affiche la ligne exacte du crash
    });
});

module.exports = app;