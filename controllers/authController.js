const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
const config = require('../config');

// Register User
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.send('User registered successfully.');
};

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).send('Admin already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({ username, email, password: hashedPassword });

    await admin.save();
    res.send('Admin registered successfully.');
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) user = await Admin.findOne({ email });
    if (!user) return res.status(400).send('User not found.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password.');

    const token = jwt.sign({ _id: user._id }, config.secret);
    res.header('Authorization', token).send({ token, user });
};

// Logout
exports.logout = (req, res) => {
    res.header('Authorization', '').send('Logged out successfully.');
};
