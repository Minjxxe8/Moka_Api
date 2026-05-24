const userService = require('../services/UserService');
const authService = require('../services/AuthService');

exports.register = async (req, res) => {
    try {
        await userService.create(req.body);
        const session = await authService.login(req.body.email, req.body.password);

        res.status(201).json({
            message: "User registered successfully",
            ...session
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating register",
            error: error.message
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.userId;

        await userService.deleteUser(userId);

        res.status(200).json({
            message: "Votre compte et toutes vos données ont été supprimés avec succès."
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression du compte",
            error: error.message
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userService.findOne(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        const { Recipe } = require("../models");
        const recipeCount = await Recipe.count({ where: { author: user.id } });

        res.status(200).json({
            user: {
                ...user,
                recipeCount,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du profil", error: error.message });
    }
};
