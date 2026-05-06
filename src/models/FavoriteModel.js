const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    return instance.define(
        "Favorite",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            profile_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "profile", key: "id" },
            },
            recipe_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "recipe", key: "id" },
            },
        },
        {
            tableName: "favorite",
            timestamps: false,
        }
    );
};