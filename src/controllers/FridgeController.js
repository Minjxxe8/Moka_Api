const fridgeService = require('../services/FridgeService');

exports.addIngredients = async (req, res) => {
    try {
        const { fridgeId } = req.params;
        const { ingredients } = req.body;

        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({ message: "La liste d'ingrédients est requise" });
        }

        const added = await fridgeService.addIngredientsToFridge(fridgeId, ingredients);

        res.status(201).json({
            message: "Ingrédients ajoutés au frigo avec succès",
            count: added.length,
            details: added
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout d'ingrédients :", error);
        return res.status(500).json({
            message: "Erreur lors de l'ajout dans le fridge",
            error: error.message
        });
    }
};

exports.getIngredients = async (req, res) => {
    try {
        const { fridgeId } = req.params;

        if (!fridgeId) {
            return res.status(400).json({ message: "L'identifiant du frigo est requis" });
        }

        const ingredients = await fridgeService.getIngredientsFromFridge(fridgeId);

        return res.status(200).json({
            message: "Ingrédients récupérés avec succès",
            count: ingredients.length,
            data: ingredients
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error);
        return res.status(500).json({
            message: "Erreur lors de la récupération du fridge",
            error: error.message
        });
    }
};

exports.getIngredientsByCategory = async (req, res) => {
    try {
        const { fridgeId } = req.params;

        if (!fridgeId) {
            return res.status(400).json({ message: "L'identifiant du frigo est requis" });
        }

        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                message: "Le paramètre de catégorie est requis (ex: ?category=fromagerie)"
            });
        }

        const ingredients = await fridgeService.getIngredientsByCategory(fridgeId, category);

        return res.status(200).json({
            message: `Ingrédients de la catégorie '${category}' récupérés avec succès`,
            count: ingredients.length,
            data: ingredients
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients par catégorie :", error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des ingrédients",
            error: error.message
        });
    }
};

exports.removeIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;

        const deletedIngredient = await fridgeService.removeIngredientFromFridge(ingredientId);

        if (!deletedIngredient) {
            return res.status(404).json({
                message: "L'ingrédient n'a pas été trouvé dans ce frigo"
            });
        }

        return res.status(200).json({
            message: "Ingrédient supprimé du frigo avec succès",
            data: deletedIngredient
        });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'ingrédient :", error);
        return res.status(500).json({
            message: "Erreur lors de la suppression de l'ingrédient",
            error: error.message
        });
    }
};