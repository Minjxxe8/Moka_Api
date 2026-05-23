const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const models = {};

// Imports de Models
models.User = require("./UserModel")(sequelize);
models.Ingredient = require("./IngredientModel")(sequelize);
models.Fridge = require("./FridgeModel")(sequelize);
models.FridgeIngredient = require("./FridgeIngredientModel")(sequelize);
models.ListsIngredients = require("./ListsIngredientsModel")(sequelize);
models.Lists = require("./ListsModel")(sequelize);
models.Recipe = require("./RecipeModel")(sequelize);
models.RecipeCategory = require("./RecipeCategoryModel")(sequelize);
models.Category = require("./CategoryModel")(sequelize);
models.RecipeIngredient = require("./RecipeIngredientModel")(sequelize);


Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;