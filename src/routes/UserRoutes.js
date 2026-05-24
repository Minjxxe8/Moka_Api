const express = require("express");
const user = require("../controllers/UserController.js");
const authenticateToken = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post("/register", user.register);
router.get("/me", authenticateToken, user.getMe);
router.delete("/me", authenticateToken, user.deleteAccount);



module.exports = (app) => {
    app.use("/users", router);
};
