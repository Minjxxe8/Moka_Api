const recipeSearchService = require("../services/RecipeSearchService");

exports.searchByCategories = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "L'UUID de l'utilisateur est requis" });
        }

        let { categories } = req.query;

        if (!categories) {
            return res.status(400).json({ message: "Le paramètre 'categories' est requis" });
        }


        if (typeof categories === "string") {
            categories = categories.split(",").map(c => c.trim()).filter(Boolean);
        }

        const validCategories = ["entrée", "plat", "dessert", "sucré", "salé", "rapide"];
        const invalid = categories.filter(c => !validCategories.includes(c.toLowerCase()));
        if (invalid.length > 0) {
            return res.status(400).json({
                message: `Catégorie(s) invalide(s) : ${invalid.join(", ")}`,
                validCategories,
            });
        }

        const recipes = await recipeSearchService.getRecipesByCategories(categories);

        return res.status(200).json({
            message: "Recettes trouvées",
            count: recipes.length,
            categories,
            recipes,
        });
    } catch (error) {
        console.error("Erreur lors de la recherche par catégories :", error);
        return res.status(500).json({
            message: "Erreur lors de la recherche par catégories",
            error: error.message,
        });
    }
};

exports.globalSearch = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(400).json({ message: "Le paramètre 'q' est requis (min. 2 caractères)" });
        }

        const recipes = await recipeSearchService.searchRecipes(q);

        return res.status(200).json({
            message: "Résultats de recherche",
            query: q,
            count: recipes.length,
            recipes,
        });
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        return res.status(500).json({
            message: "Erreur lors de la recherche",
            error: error.message,
        });
    }
};