const express = require('express');
const router = express.Router();
const { Message } = require('../models');

// קבלת כלההודעות
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// קבלת הודעה לפי ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// יצירת הודעה חדשה
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// עדכון הודעה (בעיקר לתגובות)
router.put('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// הוספת תגובה להודעה
router.post('/:id/reactions', async (req, res) => {
  try {
    const { reaction } = req.body;
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    if (!message.reactions.includes(reaction)) {
      message.reactions.push(reaction);
      await message.save();
    }
    
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// מחיקת הודעה
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;