const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
const userRoutes = require("./src/routes/UserRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
const ingredientRoutes = require("./src/routes/IngredientRoutes");
const fridgeRoutes = require("./src/routes/FridgeRoutes");
const listsIngredientsRoutes = require("./src/routes/ListsRoutes");
const recipeSearchRoutes = require("./src/routes/SearchRoutes");
const homeRoutes = require("./src/routes/HomeRoutes");

userRoutes(app);
authRoutes(app);
ingredientRoutes(app)
fridgeRoutes(app)
listsIngredientsRoutes(app)
recipeSearchRoutes(app)
homeRoutes(app)

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error("--- LOG ERREUR ---");
    console.error(err.stack);
    console.error("------------------");

    res.status(500).json({
        message: 'Erreur détectée',
        error: err.message,
        stack: err.stack
    });
});

module.exports = app;