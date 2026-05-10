const express = require("express");
const lists = require("../controllers/ListsController.js");

const router = express.Router();

router.post("/", lists.saveList);
router.post("/:fridgeId/complete", lists.completeShopping);
router.get("/:userId", lists.getUserLists);
router.get("/detail/:listId", lists.getOneList);
router.delete("/:listId", lists.deleteList);
router.put("/:listId", lists.updateList);

module.exports = (app) => {
    app.use("/list", router);
};
