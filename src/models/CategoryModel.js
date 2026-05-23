const { DataTypes } = require("sequelize");
module.exports = instance => {
    const Category = instance.define(
        "Category",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
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
            tableName: "category",
            timestamps: false,
        }
    );
    Category.associate = (models) => {
        Category.belongsToMany(models.Recipe, {
            through: models.RecipeCategory,
            foreignKey: "category_id",
            otherKey: "recipe_id",
            as: "recipes",
        });
    };
    return Category;
};