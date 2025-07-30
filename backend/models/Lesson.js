const mongoose = require('mongoose');

const lessonStepSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  aiPrompt: { 
    type: String, 
    required: true 
  },
  expectedResponses: [{ 
    type: String 
  }],
  duration: { 
    type: Number, 
    default: 10 
  }
});

const lessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  targetAge: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  steps: [lessonStepSchema],
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Child' 
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Lesson', lessonSchema);