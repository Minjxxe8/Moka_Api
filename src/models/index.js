const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const models = {};

models.User = require("./UserModel")(sequelize);
models.Ingredient = require("./IngredientModel")(sequelize);
models.Profile = require("./ProfileModel")(sequelize);
models.Favorite = require("./FavoriteModel")(sequelize);
models.Follower = require("./FollowerModel")(sequelize);

// User <-> Profile
models.User.hasOne(models.Profile, { foreignKey: "user_id" });
models.Profile.belongsTo(models.User, { foreignKey: "user_id" });

// Profile <-> Favorite
models.Profile.hasMany(models.Favorite, { foreignKey: "profile_id" });
models.Favorite.belongsTo(models.Profile, { foreignKey: "profile_id" });

// Profile <-> Follower
models.Profile.hasMany(models.Follower, { foreignKey: "following_id", as: "followers" });
models.Profile.hasMany(models.Follower, { foreignKey: "follower_id", as: "following" });

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;