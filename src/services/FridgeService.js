const { FridgeIngredient, Ingredient, User, Fridge} = require('../models');

class FridgeService {
    async findOne(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) return null;
        const { password_hash, ...userWithoutPassword } = user?.dataValues || user;
        return userWithoutPassword;
    }

    async getFridgeByUserId(userId) {
        const fridge = await Fridge.findOne({where: {users_id: userId}});
        if (!fridge) throw new Error("Aucun frigo trouvé pour cet utilisateur");
        return fridge;
    }

    async addIngredientsToFridge(fridgeId, ingredientsList) {

        const results = [];
        for (const item of ingredientsList) {
            let ingredient = await Ingredient.findOne({ where: { name: item.name } });

            const entry = await FridgeIngredient.create({
                fridge_id: fridgeId,
                ingredients_id: ingredient.id,
                quantity: item.quantity || ingredient.quantity_default,
                unite: item.unite || ingredient.unite_default,
                type: ingredient.type,
                expiry_date: item.expiry_date || null,
            });
            results.push(entry);
        }
        return results;
    }

    async getIngredientsFromFridge(fridgeId) {
        return await FridgeIngredient.findAll({
            where: { fridge_id: fridgeId },
            include: [{
                model: Ingredient,
                attributes: ['name', 'type']
            }]
        });
    }

    async getIngredientsByCategory(fridgeId, category) {
        return await FridgeIngredient.findAll({
            where: {
                fridge_id: fridgeId,
                type: category
            },
            include: [{
                model: Ingredient,
                attributes: ['name', 'type']
            }]
        });
    }

    async removeIngredientFromFridge(ingredientId) {
        const entry = await FridgeIngredient.findOne({ where: { id: ingredientId } });

        if (!entry) {
            return null;
        }

        await entry.destroy();
        return entry;
    }
}

module.exports = new FridgeService();