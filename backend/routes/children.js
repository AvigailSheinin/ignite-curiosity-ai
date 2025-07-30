const express = require('express');
const router = express.Router();
const { Child } = require('../models');

// קבלת כל הילדים
router.get('/', async (req, res) => {
  try {
    const children = await Child.find();
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// קבלת ילד לפי ID
router.get('/:id', async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    res.json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// יצירת ילד חדש
router.post('/', async (req, res) => {
  try {
    const child = new Child(req.body);
    await child.save();
    res.status(201).json(child);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// עדכון ילד
router.put('/:id', async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    res.json(child);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// מחיקת ילד
router.delete('/:id', async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;