const { Recipe } = require("../models");

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

module.exports = {
    getDailysuggestions,
};