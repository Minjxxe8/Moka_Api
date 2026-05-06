const { Profile } = require("../models/index");

class ProfileService {

    async findByUsername(username) {
        const profile = await Profile.findOne({
            where: { username },
        });
        if (!profile) return null;
        return profile;
    }

    async create(profile) {
        if (await this.findByUsername(profile.username)) throw new Error("Profile already exists");
        if (!profile.username) throw new Error("Missing field");

        const newProfile = await Profile.create({
            username: profile.username,
            bio: profile.bio || null,
        });

        if (!newProfile) throw new Error("Error creating new Profile");
        return newProfile;
    }
}

module.exports = new ProfileService();