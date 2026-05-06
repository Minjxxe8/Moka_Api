const profileService = require('../services/ProfileService.js');

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newProfile = await profileService.create({
            name, description
        });
        res.status(200).json(newProfile);
    } catch (error) {
        res.status(500).json({
            message: "Error creating Profile",
            error: error.message
        });
    }
};