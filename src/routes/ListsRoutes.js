const express = require("express");
const lists = require("../controllers/ListsController.js");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/", authMiddleware, lists.saveList);
router.post("/complete", authMiddleware, lists.completeShopping);
router.get("/me", authMiddleware, lists.getUserLists);
router.get("/detail/:listId", authMiddleware, lists.getOneList);
router.delete("/:listId", authMiddleware, lists.deleteList);
router.put("/:listId", authMiddleware, lists.updateList);

module.exports = (app) => {
    app.use("/list", router);
};