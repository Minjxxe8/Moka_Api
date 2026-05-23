const { DataTypes } = require("sequelize");
module.exports = instance => {
    const RecipeIngredient = instance.define(
        "RecipeIngredient",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            recipe_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            ingredient_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "recipe_ingredients",
            timestamps: false,
        }
    );
    return RecipeIngredient;
};