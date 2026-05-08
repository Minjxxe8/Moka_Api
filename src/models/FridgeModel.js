const { DataTypes } = require("sequelize");

module.exports = instance => {
    const Fridge = instance.define(
        "Fridge",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
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



