const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const {searchByCategories} = require("../controllers/RecipeSearchController");


router.get("/search", authMiddleware, searchByCategories);

module.exports = (app) => {
    app.use("/home", router);
};