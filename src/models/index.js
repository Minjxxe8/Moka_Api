const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const models = {};

// Imports de Models
models.User = require("./UserModel")(sequelize);
models.Ingredient = require("./IngredientModel");


Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;