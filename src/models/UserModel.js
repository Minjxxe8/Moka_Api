const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const User = instance.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    return User;
};