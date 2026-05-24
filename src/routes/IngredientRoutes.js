const express = require("express");
const ingredient = require("../controllers/IngredientController.js");

const router = express.Router();

router.post("/create", ingredient.create);
router.get("/search", ingredient.search);


module.exports = (app) => {
    app.use("/ingredient", router);
};
