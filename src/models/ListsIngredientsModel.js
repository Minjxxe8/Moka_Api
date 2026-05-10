const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const ListIngredients = instance.define("ListIngredients", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        list_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        ingredients_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: "listsIngredients",
        timestamps: false
    });

    ListIngredients.associate = (models) => {
        ListIngredients.belongsTo(models.Lists, { foreignKey: 'list_id' });
        ListIngredients.belongsTo(models.Ingredient, {
            foreignKey: 'ingredients_id',
            as: 'Ingredient'
        });
    };


    return ListIngredients;
};
