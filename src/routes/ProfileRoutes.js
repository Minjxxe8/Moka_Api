const express = require("express");
const profile = require("../controllers/ProfileController.js");

const router = express.Router();

router.get("/", profile.findAll);
router.get("/:id", profile.findById);
router.post("/", profile.create);
router.delete("/me", profile.delete);
router.put("/me", profile.update);

router.get("/me/favorite", profile.getFavorites);
router.post("/me/favorite", profile.addFavorite);
router.delete("/me/favorite/:recipeId", profile.removeFavorite);
router.get("/me/following", profile.getFollowing);


router.post("/:id/follow", profile.follow);
router.delete("/:id/follow", profile.unfollow);
router.get("/:id/followers", profile.getFollowers);
router.delete("/:id/followers", profile.deleteFollowers);

module.exports = (app) => {
    app.use("/users", router);
};