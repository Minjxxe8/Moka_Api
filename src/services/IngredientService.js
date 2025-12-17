const { Ingredient } = require("../models/index");

class IngredientService {
    
    async findByName(name) {
        const ingredient = await Ingredient.findByName({
            where: { name },
        });
        if (!ingredient) return null;
        return ingredient;
    }
    
    async create(ingredient) {
        if (await this.findByName(ingredient.name)) throw new Error("Ingredient already exists");
        if (!ingredient.name || !ingredient.quantity_default || !ingredient.type || !ingredient.unite_default) throw new Error("Missing filed");

        const newIngredient = await Ingredient.create({
            name: ingredient.name,
            quantity_default : ingredient.quantity_default,
            type: ingredient.type,
            unite_default: ingredient.unite_default
        });

        if (!newIngredient) throw new Error("Error creating new Ingredient");
        return newIngredient;
    }
}

module.exports = new IngredientService();