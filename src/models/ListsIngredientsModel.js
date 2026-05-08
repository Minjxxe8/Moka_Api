const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const List = instance.define("List", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
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

    List.associate = (models) => {
        List.belongsTo(models.User, { foreignKey: 'user_id' });
        List.belongsTo(models.Ingredient, { foreignKey: 'ingredients_id' });
    };

    return List;
};