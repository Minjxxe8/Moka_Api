const { DataTypes } = require("sequelize");
module.exports = instance => {
    const RecipeCategory = instance.define(
        "RecipeCategory",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            recipe_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            category_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "recipe_category",
            timestamps: false,
        }
    );
    return RecipeCategory;
};