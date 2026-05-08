const express = require("express");
const fridge = require("../controllers/FridgeController.js");
const {getIngredients} = require("../controllers/FridgeController");
const router = express.Router();

router.post("/:fridgeId/ingredients", fridge.addIngredients);
router.get("/:fridgeId/ingredients", fridge.getIngredients);
router.get("/:fridgeId/ingredients/category", fridge.getIngredientsByCategory);
router.delete("/ingredient/:ingredientId", fridge.removeIngredient);

module.exports = (app) => {
    app.use("/fridge", router);
};