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