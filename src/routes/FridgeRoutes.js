const express = require("express");
const fridge = require("../controllers/FridgeController.js");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/ingredients", authMiddleware, fridge.addIngredients);
router.get("/ingredients", authMiddleware, fridge.getIngredients);
router.get("/ingredients/category",authMiddleware, fridge.getIngredientsByCategory);
router.delete("/ingredient/:ingredientId", authMiddleware, fridge.removeIngredient);

module.exports = (app) => {
    app.use("/fridge", router);
};