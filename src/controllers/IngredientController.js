const ingredientService = require('../services/IngredientService.js');

exports.create = async (req, res) => {
    try {
        const { name, quantity_default, type, unite_default } = req.body;

        const newIngredient = await ingredientService.create({
            name, quantity_default, type, unite_default
        });
        res.status(200).json(newIngredient);
    } catch (error) {
        res.status(500).json({
            message: "Error creating Ingredient",
            error: error.message
        });
    }
};