// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name is required
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' }, // Reference to Region model
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }  // Reference to Branch model
}, { timestamps: true });

// Ensure that the model is not overwritten
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

module.exports = Customer;
