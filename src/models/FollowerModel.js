const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    return instance.define(
        "Follower",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            follower_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "profile", key: "id" },
            },
            following_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "profile", key: "id" },
            },
        },
        {
            tableName: "follower",
            timestamps: false,
        }
    );
};