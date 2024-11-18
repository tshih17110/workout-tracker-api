const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { status } = require('http-status');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(status.BAD_REQUEST).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(status.CREATED).json({ token, user });

    } catch (err) {
        res.status(status.BAD_REQUEST).json({ message: 'Server error', error: err});
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(status.BAD_REQUEST).send('Email or password is incorrect.');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(status.BAD_REQUEST).send('Email or password is incorrect.');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send({ token });
};

