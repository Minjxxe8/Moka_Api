const express = require("express");
const lists = require("../controllers/ListsIngredientsController.js");

const router = express.Router();

router.post("/", lists.saveList);
router.post("/:fridgeId/complete", lists.completeShopping);


module.exports = (app) => {
    app.use("/list", router);
};
