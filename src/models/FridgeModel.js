const { DataTypes } = require("sequelize");

module.exports = instance => {
    const Fridge = instance.define(
        "Fridge",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                field: 'users_id',
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
            tableName: "fridge",
            timestamps: false,
        }
    );

    Fridge.associate = (models) => {
        Fridge.hasMany(models.FridgeIngredient, { foreignKey: 'fridge_id' });
    };

    return Fridge;
}