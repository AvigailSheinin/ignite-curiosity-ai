const express = require('express');
const router = express.Router();
const { Lesson } = require('../models');

// קבלת כל השיעורים
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('participants');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// קבלת שיעור לפי ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('participants');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// יצירת שיעור חדש
router.post('/', async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    await lesson.populate('participants');
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// עדכון שיעור
router.put('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).populate('participants');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// הוספת משתתף לשיעור
router.post('/:id/participants', async (req, res) => {
  try {
    const { childId } = req.body;
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    if (!lesson.participants.includes(childId)) {
      lesson.participants.push(childId);
      await lesson.save();
    }
    
    await lesson.populate('participants');
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// מחיקת שיעור
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;