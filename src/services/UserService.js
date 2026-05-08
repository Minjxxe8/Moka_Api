const { User, Fridge } = require("../models/index");
const bcrypt = require('bcrypt');

class UserService {
    async findByEmail(email) {
        const user = await User.findOne({
            where: { email },
        });
        if (!user) return null;
        const { password_hash, ...userWithoutPassword } = user?.dataValues || user;
        return userWithoutPassword;
    }

    async findOne(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) return null;
        const { password_hash, ...userWithoutPassword } = user?.dataValues || user;
        return userWithoutPassword;
    }

    async create(user) {
        if (await this.findByEmail(user.email)) throw new Error('Email already used');
        if (!user.username || !user.password || !user.email) throw new Error('Missing field');

        const password_hash = await bcrypt.hash(user.password, 10);

        const newUser = await User.create({
            username: user.username,
            email: user.email,
            password_hash
        });

        if (!newUser) throw new Error("Error creating new user");

        await Fridge.create({
            userId: newUser.id,
            name: `Frigo de ${newUser.username}`
        });

        const { password_hash: _, ...userWithoutPassword } = newUser?.dataValues || newUser;
        return userWithoutPassword;
    }

    async login(email, password) {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const { password_hash, ...userWithoutPassword } = user?.dataValues || user;
        return { user: userWithoutPassword };
    }
}

module.exports = new UserService();