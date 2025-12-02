const userService = require('../services/UserService');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const newUser = await userService.create({
            username,
            email,
            password
        });
        res.status(201).send({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).send({
            message: "Error creating register",
            error: error.message
        });
    }
};