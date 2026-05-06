const { Profile, Favorite, Follower } = require("../models/index");

class ProfileService {

    async findAll() {
        return await Profile.findAll();
    }

    async findById(id) {
        const profile = await Profile.findOne({ where: { id } });
        if (!profile) throw new Error("Profile not found");
        return profile;
    }

    async findByUserId(user_id) {
        const profile = await Profile.findOne({ where: { user_id } });
        if (!profile) return null;
        return profile;
    }

    async findByUsername(username) {
        const profile = await Profile.findOne({ where: { username } });
        if (!profile) return null;
        return profile;
    }

    async create(data) {
        if (await this.findByUsername(data.username)) throw new Error("Username already exists");
        if (!data.username || !data.user_id) throw new Error("Missing field");

        const newProfile = await Profile.create({
            user_id: data.user_id,
            username: data.username,
            bio: data.bio || null,
            avatar_url: data.avatar_url || null,
        });

        if (!newProfile) throw new Error("Error creating new Profile");
        return newProfile;
    }

    async delete(user_id) {
        const profile = await this.findByUserId(user_id);
        if (!profile) throw new Error("Profile not found");
        await profile.destroy();
        return { message: "Profile deleted" };
    }

    // Favorites
    async getFavorites(user_id) {
        const profile = await this.findByUserId(user_id);
        if (!profile) throw new Error("Profile not found");
        return await Favorite.findAll({ where: { profile_id: profile.id } });
    }

    async addFavorite(user_id, recipe_id) {
        const profile = await this.findByUserId(user_id);
        if (!profile) throw new Error("Profile not found");

        const existing = await Favorite.findOne({ where: { profile_id: profile.id, recipe_id } });
        if (existing) throw new Error("Recipe already in favorites");

        return await Favorite.create({ profile_id: profile.id, recipe_id });
    }

    async removeFavorite(user_id, recipe_id) {
        const profile = await this.findByUserId(user_id);
        if (!profile) throw new Error("Profile not found");

        const favorite = await Favorite.findOne({ where: { profile_id: profile.id, recipe_id } });
        if (!favorite) throw new Error("Favorite not found");

        await favorite.destroy();
        return { message: "Favorite removed" };
    }

    // Followers
    async follow(follower_user_id, following_id) {
        const followerProfile = await this.findByUserId(follower_user_id);
        if (!followerProfile) throw new Error("Profile not found");

        const existing = await Follower.findOne({ where: { follower_id: followerProfile.id, following_id } });
        if (existing) throw new Error("Already following");

        return await Follower.create({ follower_id: followerProfile.id, following_id });
    }

    async unfollow(follower_user_id, following_id) {
        const followerProfile = await this.findByUserId(follower_user_id);
        if (!followerProfile) throw new Error("Profile not found");

        const follow = await Follower.findOne({ where: { follower_id: followerProfile.id, following_id } });
        if (!follow) throw new Error("Not following");

        await follow.destroy();
        return { message: "Unfollowed" };
    }

    async getFollowers(profile_id) {
        return await Follower.findAll({ where: { following_id: profile_id } });
    }

    async deleteAllFollowers(profile_id) {
        await Follower.destroy({ where: { following_id: profile_id } });
        return { message: "All followers removed" };
    }
    async update(user_id, data) {
        const profile = await this.findByUserId(user_id);
        if (!profile) throw new Error("Profile not found");

        if (data.username) {
            const existing = await this.findByUsername(data.username);
            if (existing && existing.id !== profile.id) throw new Error("Username already taken");
        }

        await profile.update({
            username: data.username || profile.username,
            bio: data.bio ?? profile.bio,
            avatar_url: data.avatar_url ?? profile.avatar_url,
        });

        return profile;
    }

    async getFollowing(user_id) {
        const profile = await this.findByUserId(user_id);
        if (!profile) throw new Error("Profile not found");
        return await Follower.findAll({ where: { follower_id: profile.id } });
    }
}

module.exports = new ProfileService();