const authService = require('../services/AuthService');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Token manquant" });

    const decoded = authService.verifyToken(token);
    if (!decoded) return res.status(403).json({ message: "Token invalide" });

    console.log("Token décodé :", decoded); // <--- Vérifie ce qui s'affiche ici !

    req.userId = decoded.userId;
    next();
};