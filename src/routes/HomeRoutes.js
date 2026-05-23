const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const home = require("../controllers/HomeController");

router.get("/suggestions", authMiddleware, home.getDailySuggestions);

module.exports = (app) => {
    app.use("/home", router);
};