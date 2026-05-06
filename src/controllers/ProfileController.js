const profileService = require('../services/ProfileService.js');

exports.findAll = async (req, res) => {
    try {
        const profiles = await profileService.findAll();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error: error.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const profile = await profileService.findById(req.params.id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(404).json({ message: "Profile not found", error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { username, bio, avatar_url, user_id } = req.body;
        const newProfile = await profileService.create({ username, bio, avatar_url, user_id });
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ message: "Error creating Profile", error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { user_id } = req.body;
        const result = await profileService.delete(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error deleting Profile", error: error.message });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const { user_id } = req.body;
        const favorites = await profileService.getFavorites(user_id);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites", error: error.message });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const { user_id, recipe_id } = req.body;
        const favorite = await profileService.addFavorite(user_id, recipe_id);
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: "Error adding favorite", error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { user_id } = req.body;
        const { recipeId } = req.params;
        const result = await profileService.removeFavorite(user_id, recipeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error removing favorite", error: error.message });
    }
};

exports.follow = async (req, res) => {
    try {
        const { user_id } = req.body;
        const { id } = req.params;
        const result = await profileService.follow(user_id, id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error following user", error: error.message });
    }
};

exports.unfollow = async (req, res) => {
    try {
        const { user_id } = req.body;
        const { id } = req.params;
        const result = await profileService.unfollow(user_id, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error unfollowing user", error: error.message });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        const followers = await profileService.getFollowers(id);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching followers", error: error.message });
    }
};

exports.deleteFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await profileService.deleteAllFollowers(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error deleting followers", error: error.message });
    }
    exports.update = async (req, res) => {
        try {
            const { user_id, username, bio, avatar_url } = req.body;
            const updated = await profileService.update(user_id, { username, bio, avatar_url });
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: "Error updating Profile", error: error.message });
        }
    };

    exports.getFollowing = async (req, res) => {
        try {
            const { user_id } = req.body;
            const following = await profileService.getFollowing(user_id);
            res.status(200).json(following);
        } catch (error) {
            res.status(500).json({ message: "Error fetching following", error: error.message });
        }
    };
};