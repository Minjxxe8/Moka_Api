const { Recipe, Category, RecipeCategory, Favorite } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

function getDailySeed() {
    const now = new Date();
    return `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
}

function seededRandom(seed, index) {
    let hash = 0;
    const str = `${seed}-${index}`;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

async function getDailysuggestions() {
    const allRecipes = await Recipe.findAll({ attributes: ["id"] });

    if (allRecipes.length <= 3) {
        return await Recipe.findAll();
    }

    const seed = getDailySeed();
    const ids = allRecipes.map(r => Number(r.id));

    const shuffled = [...ids].sort((a, b) => {
        return seededRandom(seed, a) - seededRandom(seed, b);
    });

    const pickedIds = shuffled.slice(0, 3);

    return await Recipe.findAll({
        where: {id: pickedIds},
    });
}


async function getTopByCategory() {
    const categories = await Category.findAll();

    const result = await Promise.all(
        categories.map(async (category) => {
            const pivotRows = await RecipeCategory.findAll({
                where: { category_id: category.id },
                attributes: ["recipe_id"],
            });

            if (!pivotRows.length) return { category: category.name, recipes: [] };

            const recipeIds = pivotRows.map(r => r.recipe_id);

            const favorites = await Favorite.findAll({
                where: { recipe_id: { [Op.in]: recipeIds } },
                attributes: [
                    "recipe_id",
                    [fn("COUNT", col("recipe_id")), "favorite_count"],
                ],
                group: ["recipe_id"],
                order: [[literal("favorite_count"), "DESC"]],
            });

            const sortedIds = favorites.map(f => f.recipe_id);

            const withoutFavorites = recipeIds.filter(id => !sortedIds.includes(id));
            const finalIds = [...sortedIds, ...withoutFavorites];

            const recipes = await Recipe.findAll({
                where: { id: { [Op.in]: finalIds } },
            });

            const recipesMap = Object.fromEntries(recipes.map(r => [r.id, r]));
            const sortedRecipes = finalIds.map(id => recipesMap[id]).filter(Boolean);

            return {
                category: category.name,
                recipes: sortedRecipes,
            };
        })
    );

    return result;
}


async function getUserRecentFavorites(userId) {
    const favorites = await Favorite.findAll({
        where: { profile_id: userId },
        order: [["id", "DESC"]],
        attributes: ["recipe_id"],
    });

    if (!favorites.length) return [];

    const recipeIds = favorites.map(f => f.recipe_id);

    const recipes = await Recipe.findAll({
        where: { id: { [Op.in]: recipeIds } },
    });

    // Remet dans l'ordre (plus récent en premier)
    const recipesMap = Object.fromEntries(recipes.map(r => [r.id, r]));
    return recipeIds.map(id => recipesMap[id]).filter(Boolean);
}

module.exports = {
    getDailysuggestions,
    getTopByCategory,
    getUserRecentFavorites,
};