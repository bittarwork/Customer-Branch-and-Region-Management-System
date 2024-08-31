// controllers/customerController.js
const Customer = require('../models/Customer');
const Region = require('../models/Region');
const Branch = require('../models/Branch');

// Create a new customer
exports.createCustomer = async (req, res) => {
    const { name, phone, email, website, region, branch } = req.body;

    try {
        // Check if region and branch exist
        if (region) {
            const regionExists = await Region.exists({ _id: region });
            if (!regionExists) {
                return res.status(400).json({ message: 'Region does not exist' });
            }
        }

        if (branch) {
            const branchExists = await Branch.exists({ _id: branch });
            if (!branchExists) {
                return res.status(400).json({ message: 'Branch does not exist' });
            }
        }

        // Create a new customer
        const customer = new Customer({ name, phone, email, website, region, branch });
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        console.error('Error creating customer:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get all customers with optional filtering and search
exports.getCustomers = async (req, res) => {
    const { search, region, branch } = req.query;

    try {
        // Build the query object
        let query = {};

        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') }, // Case-insensitive search on name
                { email: new RegExp(search, 'i') } // Case-insensitive search on email
            ];
        }

        if (region) {
            query.region = region;
        }

        if (branch) {
            query.branch = branch;
        }

        // Find customers based on query
        const customers = await Customer.find(query).populate('region branch');
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, website, region, branch } = req.body;

    try {
        // Find and update the customer
        const customer = await Customer.findByIdAndUpdate(id, {
            name,
            phone,
            email,
            website,
            region,
            branch
        }, { new: true }).populate('region branch');

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the customer
        const customer = await Customer.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer removed' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
