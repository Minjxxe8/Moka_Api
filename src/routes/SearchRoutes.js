const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const {searchByCategories, globalSearch} = require("../controllers/RecipeSearchController");


router.get("/search", authMiddleware, searchByCategories);
router.get("/global/search", authMiddleware, globalSearch);

module.exports = (app) => {
    app.use("/home", router);
};