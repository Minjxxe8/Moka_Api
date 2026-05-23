const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Recipe = instance.define(
        "Recipe",
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

            cooking_time: {
                type: DataTypes.TIME,
                allowNull: true,
            },

            country: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            favorite: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            people: {
                type: DataTypes.SMALLINT,
                allowNull: true,
            },

            steps: {
                type: DataTypes.SMALLINT,
                allowNull: true,
            },

            rating: {
                type: DataTypes.SMALLINT,
                allowNull: true,
            },

            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            likes: {
                type: DataTypes.SMALLINT,
                allowNull: true,
            },

            picture: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            budget: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            author: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "users",
                    key: "id",
                },
            },

            dificulty: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: "recipe",
            timestamps: false,
        }
    );

    Recipe.associate = (models) => {

        Recipe.belongsToMany(models.Category, {
            through: models.RecipeCategory,
            foreignKey: "recipe_id",
            otherKey: "category_id",
            as: "categories",
        });

        Recipe.belongsTo(models.User, {
            foreignKey: "author",
            as: "user",
        });
    };

    return Recipe;
};