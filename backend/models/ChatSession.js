const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  lessonId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true 
  },
  messages: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message' 
  }],
  currentStep: { 
    type: Number, 
    default: 0 
  },
  currentSpeaker: { 
    type: String, 
    default: null 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  startTime: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);