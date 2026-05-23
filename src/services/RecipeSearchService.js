const { Recipe, Category, RecipeCategory } = require("../models");
const { Op } = require("sequelize");

async function getRecipesByCategories(categoryNames) {
    const categories = await Category.findAll({
        where: {
            name: { [Op.iLike]: { [Op.any]: categoryNames.map(c => c.trim()) } },
        },
    });

    if (!categories || categories.length === 0) {
        return [];
    }

    const categoryIds = categories.map(c => c.id);

    const pivotRows = await RecipeCategory.findAll({
        where: { category_id: { [Op.in]: categoryIds } },
        attributes: ["recipe_id"],
    });

    if (!pivotRows || pivotRows.length === 0) {
        return [];
    }

    const recipeIds = [...new Set(pivotRows.map(r => r.recipe_id))];

    return await Recipe.findAll({
        where: {id: {[Op.in]: recipeIds}},
    });
}

module.exports = {
    getRecipesByCategories,
};