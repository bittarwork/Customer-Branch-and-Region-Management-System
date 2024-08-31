const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    notes: { type: String },
    phone: { type: String },
    mobile: { type: String },
    color: { type: String, default: '#FFFFFF' }  // Default color is white
}, { timestamps: true });

// Ensure that the model is not overwritten
const Branch = mongoose.models.Branch || mongoose.model('Branch', branchSchema);

module.exports = Branch;
