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

exports.search = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim().length < 1) {
            return res.status(400).json({ message: "Le paramètre 'q' est requis" });
        }
        const { Ingredient } = require("../models");
        const { Op } = require("sequelize");
        const ingredients = await Ingredient.findAll({
            where: { name: { [Op.iLike]: `%${q.trim()}%` } },
            attributes: ["id", "name", "type", "unite_default", "quantity_default"],
            limit: 20,
        });
        res.status(200).json({ ingredients });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: error.message });
    }
};