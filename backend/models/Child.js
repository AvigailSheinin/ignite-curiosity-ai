const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  avatar: { 
    type: String, 
    required: true 
  },
  personality: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Child', childSchema);