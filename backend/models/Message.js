const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { 
    type: String, 
    required: true 
  },
  senderName: { 
    type: String, 
    required: true 
  },
  senderType: { 
    type: String, 
    enum: ['child', 'ai'], 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  reactions: [{ 
    type: String 
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Message', messageSchema);