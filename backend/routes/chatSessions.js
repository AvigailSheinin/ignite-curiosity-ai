const express = require('express');
const router = express.Router();
const { ChatSession } = require('../models');

// קבלת כל הסשנים
router.get('/', async (req, res) => {
  try {
    const sessions = await ChatSession.find()
      .populate('lessonId')
      .populate('messages');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// קבלת סשן לפי ID
router.get('/:id', async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.id)
      .populate('lessonId')
      .populate('messages');
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// יצירת סשן חדש
router.post('/', async (req, res) => {
  try {
    const session = new ChatSession(req.body);
    await session.save();
    await session.populate(['lessonId', 'messages']);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// עדכון סשן
router.put('/:id', async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).populate(['lessonId', 'messages']);
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// הוספת הודעה לסשן
router.post('/:id/messages', async (req, res) => {
  try {
    const { messageId } = req.body;
    const session = await ChatSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    
    session.messages.push(messageId);
    await session.save();
    await session.populate(['lessonId', 'messages']);
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// סיום סשן
router.patch('/:id/end', async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).populate(['lessonId', 'messages']);
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;