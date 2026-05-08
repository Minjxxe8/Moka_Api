const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const FridgeIngredient =  instance.define("FridgeIngredient", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fridge_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ingredients_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            alloNull: true,
        },
        unite: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Légume',
        },
        expiry_date: {
            type: DataTypes.DATE
        }
    },
        {
        tableName: "fridge_ingredients",
        timestamps: false,
        created_at: 'created_at',
        updatedAt: false
    });

    FridgeIngredient.associate = (models) => {
        FridgeIngredient.belongsTo(models.Fridge, { foreignKey: 'fridge_id' });
        FridgeIngredient.belongsTo(models.Ingredient, { foreignKey: 'ingredients_id' });
    };
    return FridgeIngredient;
};