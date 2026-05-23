const { DataTypes } = require("sequelize");
module.exports = instance => {
    const Favorite = instance.define(
        "Favorite",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            recipe_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            profile_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            tableName: "favorite",
            timestamps: false,
        }
    );
    return Favorite;
};