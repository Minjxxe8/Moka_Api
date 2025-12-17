const { DataTypes } = require("sequelize");

module.exports = instance => {
    const Ingredient = instance.define(
        "Ingredient",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            quantity_default: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('fromagerie', 'viande', 'poisson', 'légume', 'fruit', 'pate_ble', 'épicerie'),
                allowNull: false,
            },
            unit_default: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "ingredient",
            timestamps: true,
        }
    )
}