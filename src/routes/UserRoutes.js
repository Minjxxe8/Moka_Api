const express = require("express");
const user = require("../controllers/UserController.js");

const router = express.Router();

router.post("/register", user.register);


module.exports = (app) => {
    app.use("/users", router);
};
