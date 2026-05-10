const {Lists, ListsIngredients, Ingredient} = require('../models');
const fridgeService = require('./FridgeService');

class ListService {
    async createList(userId, listName, ingredientsIds) {
        const newList = await Lists.create({
            name: listName || "Ma liste de courses",
            user_id: userId
        });

        if (ingredientsIds && ingredientsIds.length > 0) {
            const entries = ingredientsIds.map(ingId => ({
                list_id: newList.id,
                ingredients_id: ingId
            }));
            await ListsIngredients.bulkCreate(entries);
        }

        return newList;
    }

    async migrateListToFridge(userId, listId, fridgeId) {
        const shoppingList = await ListsIngredients.findAll({
            where: { list_id: listId },
            include: [{
                model: Ingredient,
                as: 'Ingredient'
            }]
        });

        if (!shoppingList || shoppingList.length === 0) return [];

        const ingredientsForFridge = shoppingList.map(item => ({
            name: item.Ingredient.name,
            quantity: item.Ingredient.quantity_default || 1,
            type: item.Ingredient.type,
            unite: item.Ingredient.unite_default || 'unité'
        }));

        const added = await fridgeService.addIngredientsToFridge(fridgeId, ingredientsForFridge);

        if (added.length > 0) {
            await Lists.update(
                { is_completed: true }, // On passe le booléen à true (ou 1)
                { where: { id: listId } }
            );
        }

        return added;
    }

    async getAllUserLists(userId) {
        return await Lists.findAll({
            where: { user_id: userId },
            include: [{
                model: ListsIngredients,
                as: 'Ingredients',
                include: [{
                    model: Ingredient,
                    as: 'Ingredient'
                }]
            }],
            order: [['created_at', 'DESC']]
        });
    }

    async getListById(listId) {
        return await Lists.findOne({
            where: { id: listId },
            include: [{
                model: ListsIngredients,
                as: 'Ingredients',
                include: [{
                    model: Ingredient,
                    as: 'Ingredient'
                }]
            }]
        });
    }

    async deleteList(listId, userId) {
        await ListsIngredients.destroy({ where: { list_id: listId } });

        return await Lists.destroy({
            where: {
                id: listId,
                user_id: userId
            }
        });
    }

    async updateList(listId, userId, listName, ingredientsIds) {
        await Lists.update(
            { name: listName },
            { where: { id: listId, user_id: userId } }
        );

        if (ingredientsIds && Array.isArray(ingredientsIds)) {
            await ListsIngredients.destroy({ where: { list_id: listId } });

            if (ingredientsIds.length > 0) {
                const entries = ingredientsIds.map(ingId => ({
                    list_id: listId,
                    ingredients_id: ingId
                }));
                await ListsIngredients.bulkCreate(entries);
            }
        }

        return { message: "Liste mise à jour avec succès" };
    }
}

module.exports = new ListService();