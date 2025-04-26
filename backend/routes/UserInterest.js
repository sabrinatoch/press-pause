const express = require('express');
const router = express.Router();
const UserInterest = require('../models/UserInterest');

// POST: Save user interests
router.post('/', async (req, res) => {
  try {
    const newUserInterest = new UserInterest(req.body);
    await newUserInterest.save();
    res.status(201).json({ message: 'User interests saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user interests' });
  }
});

module.exports = router;
