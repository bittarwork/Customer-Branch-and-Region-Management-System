// controllers/regionController.js
const Region = require('../models/Region');
const Customer = require('../models/Customer');

// Create a new region
exports.createRegion = async (req, res) => {
    const { name, notes, color } = req.body;

    // Check if the user has permission
    if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to create regions' });
    }

    try {
        const region = await Region.create({ name, notes, color });
        res.status(201).json(region);
    } catch (error) {
        console.error('Error creating region:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all regions with optional search and filter
exports.getRegions = async (req, res) => {
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

        // Fetch regions based on filter criteria
        const regions = await Region.find(filter);
        res.status(200).json(regions);
    } catch (error) {
        console.error('Error fetching regions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing region
exports.updateRegion = async (req, res) => {
    const { id } = req.params;
    const { name, notes, color } = req.body;

    // Check if the user has permission
    if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to update regions' });
    }

    try {
        const region = await Region.findById(id);

        if (!region) {
            return res.status(404).json({ message: 'Region not found' });
        }

        region.name = name || region.name;
        region.notes = notes || region.notes;
        region.color = color || region.color;  // Update the color

        await region.save();
        res.status(200).json(region);
    } catch (error) {
        console.error('Error updating region:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a region
exports.deleteRegion = async (req, res) => {
    const { id } = req.params;

    // Ensure the user has the right permissions
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'You do not have permission to delete regions' });
    }

    try {
        // Check if there are any customers associated with this region
        const customerCount = await Customer.countDocuments({ region: id });

        if (customerCount > 0) {
            return res.status(400).json({ message: 'Cannot delete region, it is associated with one or more customers' });
        }

        // Find and delete the region
        const result = await Region.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Region not found' });
        }

        res.status(200).json({ message: 'Region removed' });
    } catch (error) {
        console.error('Error deleting region:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
