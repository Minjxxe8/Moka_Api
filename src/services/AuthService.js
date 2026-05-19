const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const SECRET_KEY = process.env.JWT_SECRET ;

class AuthService {
    async login(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new Error("Invalid credentials");
        }

        const token = this.generateToken(user.id);
        return { user: { id: user.id, email: user.email, username: user.username }, token };
    }

    generateToken(userId) {
        return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, SECRET_KEY);

        } catch (error) {
            return null;
        }
    }
}

module.exports = new AuthService();