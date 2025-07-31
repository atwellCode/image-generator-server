const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // JavaScript uses lowercase 'true'
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
  },
  password: {
    type: String,
    required: true,
  },
  creditBalance: {
    type: Number, // Typically numeric for balances
    required: true,
    default: 5, // Optional: default value
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
