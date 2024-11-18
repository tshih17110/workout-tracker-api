const jwt = require('jsonwebtoken');
const { status } = require('http-status');
const User = require('../models/User');

const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(status.UNAUTHORIZED).json({ error: 'Access denied.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: verified.id };
        const user = await User.findById(verified.id);

        if (!user) {
            return res.status(status.BAD_REQUEST).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(status.BAD_REQUEST).json({ error: 'Invalid token' });
    }
};

module.exports = protect;
