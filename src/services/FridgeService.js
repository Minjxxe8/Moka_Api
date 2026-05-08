const { FridgeIngredient, Ingredient, User} = require('../models');

class FridgeService {
    async findOne(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) return null;
        const { password_hash, ...userWithoutPassword } = user?.dataValues || user;
        return userWithoutPassword;
    }

    async addIngredientsToFridge(fridgeId, ingredientsList) {
        const results = [];

        for (const item of ingredientsList) {
            let ingredient;

            ingredient = await Ingredient.findOne({ where: { name: item.name } });

            if (!ingredient) {
                ingredient = await Ingredient.create({
                    name: item.name,
                    type: item.type || 'épicerie',
                    unite_default: item.unite || "unité"
                });
            }
            let entry = await FridgeIngredient.findOne({
                where: {
                    fridge_id: fridgeId,
                    ingredients_id: ingredient.id
                }
            });

            if (entry) {
                entry.quantity += item.quantity || 1;
                await entry.save();
                results.push(entry);
            } else {
                const newEntry = await FridgeIngredient.create({
                    fridge_id: fridgeId,
                    ingredients_id: ingredient.id,
                    quantity: item.quantity || ingredient.quantity_default,
                    unite: item.unite || ingredient.unite_default,
                    type: ingredient.type,
                    expiry_date: item.expiry_date || null
                });
                results.push(newEntry);
            }
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