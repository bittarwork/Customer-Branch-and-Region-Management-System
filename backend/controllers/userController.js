// userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Create a new user account
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'You do not have permission to create users' });
    }

    if (role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'You do not have permission to create this role' });
    }

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({
        message: 'User created successfully',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// Retrieve all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
});

// Update a user account
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (req.user.role !== 'superadmin' && role && role !== user.role) {
        return res.status(403).json({ message: 'You do not have permission to change the role' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
        message: 'User updated successfully',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// Delete a user account
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (req.user.role !== 'superadmin' && user.role === 'superadmin') {
        return res.status(403).json({ message: 'You do not have permission to delete this user' });
    }

    if (req.user.role === 'user') {
        return res.status(403).json({ message: 'You do not have permission to delete users' });
    }

    await User.deleteOne({ _id: id });

    res.status(200).json({ message: 'User removed successfully' });
});

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
};
