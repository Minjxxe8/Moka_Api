const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Lists = instance.define("Lists", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        tableName: "lists",
        timestamps: false
    });

    Lists.associate = (models) => {
        Lists.belongsTo(models.User, { foreignKey: 'user_id' });
        Lists.hasMany(models.ListsIngredients, { foreignKey: 'list_id', as: 'Ingredients' });
    };

    return Lists;
};