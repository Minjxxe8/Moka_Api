const { Recipe, Category, RecipeCategory, Ingredient, RecipeIngredient } = require("../models");
const { Op } = require("sequelize");


// Recherche par catégories (existant)
async function getRecipesByCategories(categoryNames) {
    const categories = await Category.findAll({
        where: {
            name: { [Op.iLike]: { [Op.any]: categoryNames.map(c => c.trim()) } },
        },
    });

    if (!categories || categories.length === 0) return [];

    const categoryIds = categories.map(c => c.id);

    const pivotRows = await RecipeCategory.findAll({
        where: { category_id: { [Op.in]: categoryIds } },
        attributes: ["recipe_id"],
    });

    if (!pivotRows || pivotRows.length === 0) return [];

    const recipeIds = [...new Set(pivotRows.map(r => r.recipe_id))];

    return await Recipe.findAll({ where: { id: { [Op.in]: recipeIds } } });
}

async function searchRecipes(query) {
    const term = query.trim();

    // Les 3 recherches en parallèle
    const [byName, byCountry, byIngredient] = await Promise.all([

        // 1. Par nom de recette
        Recipe.findAll({
            where: { name: { [Op.iLike]: `%${term}%` } },
        }),

        // 2. Par pays
        Recipe.findAll({
            where: { country: { [Op.iLike]: `%${term}%` } },
        }),

        // 3. Par nom d'ingrédient → pivot → recettes
        Ingredient.findAll({
            where: { name: { [Op.iLike]: `%${term}%` } },
            attributes: ["id"],
        }).then(async (ingredients) => {
            if (!ingredients.length) return [];

            const ingredientIds = ingredients.map(i => i.id);

            const pivotRows = await RecipeIngredient.findAll({
                where: { ingredient_id: { [Op.in]: ingredientIds } },
                attributes: ["recipe_id"],
            });

            if (!pivotRows.length) return [];

            const recipeIds = [...new Set(pivotRows.map(r => r.recipe_id))];
            return await Recipe.findAll({ where: { id: { [Op.in]: recipeIds } } });
        }),
    ]);

    const all = [...byName, ...byCountry, ...byIngredient];
    return Object.values(
        all.reduce((acc, recipe) => {
            acc[recipe.id] = recipe;
            return acc;
        }, {})
    );
}

module.exports = {
    getRecipesByCategories,
    searchRecipes,
};