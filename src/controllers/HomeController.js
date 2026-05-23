const homeService = require("../services/HomeService");

exports.getDailySuggestions = async (req, res) => {
    try {
        const suggestions = await homeService.getDailysuggestions();

        return res.status(200).json({
            message: "Suggestions du jour",
            date: new Date().toISOString().split("T")[0],
            count: suggestions.length,
            suggestions,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des suggestions",
            error: error.message,
        });
    }
};


exports.getTopByCategory = async (req, res) => {
    try {
        const top = await homeService.getTopByCategory();
        return res.status(200).json({
            message: "Top recettes par catégorie",
            data: top,
        });
    } catch (error) {
        console.error("Erreur top recettes :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération du top", error: error.message });
    }
};

exports.getUserFavorites = async (req, res) => {
    try {
        const userId = req.userId;
        const favorites = await homeService.getUserRecentFavorites(userId);
        return res.status(200).json({
            message: "Vos favoris récents",
            count: favorites.length,
            favorites,
        });
    } catch (error) {
        console.error("Erreur favoris :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des favoris", error: error.message });
    }
};