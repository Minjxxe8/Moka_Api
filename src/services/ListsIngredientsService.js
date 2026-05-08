const {ListsIngredients, Ingredient} = require('../models');
const fridgeService = require('./FridgeService');

class ListService {
    async createList(userId, ingredientsIds) {

        if (!userId) throw new Error("User ID is required");

        if (!ingredientsIds || ingredientsIds.length === 0) return [];

        const entries = ingredientsIds.map(ingId => ({
            user_id: userId,
            ingredients_id: ingId
        }));

        return await ListsIngredients.bulkCreate(entries);
    }


    async migrateListToFridge(userId, fridgeId) {

        const shoppingList = await ListsIngredients.findAll({
            where: { user_id: userId },
            include: [{
                model: Ingredient,
                as: 'Ingredient'
            }]
        });

        if (!shoppingList || shoppingList.length === 0) return [];

        const ingredientsForFridge = shoppingList.map(item => {
            if (!item.Ingredient) {
                console.error(`Alerte: Pas d'ingrédient trouvé pour l'entrée de liste ID ${item.id}`);
                return null;
            }
            return {
                name: item.Ingredient.name,
                quantity: item.quantity_default,
                type: item.Ingredient.type,
                unite: item.Ingredient.unite_default || 'unité',
            };
        }).filter(Boolean);

        const added = await fridgeService.addIngredientsToFridge(fridgeId, ingredientsForFridge);

        if (added.length > 0) {
            await ListsIngredients.destroy({ where: { user_id: userId } });
        }

        return added;
    }
}

module.exports = new ListService();