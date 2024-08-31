// controllers/branchController.js
const Branch = require('../models/Branch');
const Customer = require('../models/Customer');

// Create a new branch
exports.createBranch = async (req, res) => {
    const { name, notes, phone, mobile, color } = req.body;

    // Check if the user has permission
    if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to create branches' });
    }

    try {
        const branch = await Branch.create({ name, notes, phone, mobile, color });
        res.status(201).json(branch);
    } catch (error) {
        console.error('Error creating branch:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all branches with optional search and filter
exports.getBranches = async (req, res) => {
    const { name, notes, color } = req.query; // Extract query parameters

    try {
        // Build the filter object
        const filter = {};
        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') };
        }
        if (notes) {
            filter.notes = { $regex: new RegExp(notes, 'i') };
        }
        if (color) {
            filter.color = { $regex: new RegExp(color, 'i') };
        }

        // Fetch branches based on filter criteria
        const branches = await Branch.find(filter);
        res.status(200).json(branches);
    } catch (error) {
        console.error('Error fetching branches:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing branch
exports.updateBranch = async (req, res) => {
    const { id } = req.params;
    const { name, notes, phone, mobile, color } = req.body;

    // Check if the user has permission
    if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to update branches' });
    }

    try {
        const branch = await Branch.findById(id);

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        branch.name = name || branch.name;
        branch.notes = notes || branch.notes;
        branch.phone = phone || branch.phone;
        branch.mobile = mobile || branch.mobile;
        branch.color = color || branch.color;

        await branch.save();
        res.status(200).json(branch);
    } catch (error) {
        console.error('Error updating branch:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a branch
exports.deleteBranch = async (req, res) => {
    const { id } = req.params;

    // Ensure the user has the right permissions
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'You do not have permission to delete branches' });
    }

    try {
        // Check if there are any customers associated with this branch
        const customerCount = await Customer.countDocuments({ branch: id });

        if (customerCount > 0) {
            return res.status(400).json({ message: 'Cannot delete branch, it is associated with one or more customers' });
        }

        // Find and delete the branch
        const result = await Branch.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        res.status(200).json({ message: 'Branch removed' });
    } catch (error) {
        console.error('Error deleting branch:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
