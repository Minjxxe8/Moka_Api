const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const home = require("../controllers/HomeController");

router.get("/suggestions", authMiddleware, home.getDailySuggestions);
router.get("/top", authMiddleware, home.getTopByCategory);
router.get("/favoris", authMiddleware, home.getUserFavorites);

module.exports = (app) => {
    app.use("/home", router);
};