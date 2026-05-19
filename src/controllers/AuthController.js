const authService = require('../services/AuthService');

exports.login = async (req, res) => {
    try {
        const session = await authService.login(req.body.email, req.body.password);
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: "Erreur login", error: error.message });
    }
};

exports.logout = async (req, res) => {
    res.status(200).json({ message: "Déconnecté" });
};