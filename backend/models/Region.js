// models/Region.js
const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name is required
    notes: { type: String, default: '' },    // Notes are optional, defaulting to an empty string if not provided
    color: { type: String, default: '#FFFFFF' }  // Default color is white
}, { timestamps: true });

// Ensure that the model is not overwritten
const Region = mongoose.models.Region || mongoose.model('Region', regionSchema);

module.exports = Region;
