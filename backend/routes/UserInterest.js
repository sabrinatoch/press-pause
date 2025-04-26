const express = require('express');
const router = express.Router();
const UserInterest = require('../models/UserInterest'); 


router.post('/api/user-interest', async (req, res) => {
  try {
    const userInterest = new UserInterest(req.body);
    await userInterest.save();
    res.status(201).json({ message: 'Interests saved successfully!', userInterest });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error saving interests', error });
  }
});

module.exports = router;
