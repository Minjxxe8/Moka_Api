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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user} = await userService.login(email, password);

        res.status(200).send({
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        const status = error.message === "Invalid credentials" ? 401 : 500;
        res.status(status).send({
            message: "Login failed",
            error: error.message
        });
    }
};
