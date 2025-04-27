const express = require('express');
const router = express.Router();
const SelectedPackage = require('../models/SelectedPackage');

// POST full package
router.post('/full-package', async (req, res) => {
  try {
    const pkg = req.body;

    const newPackage = new SelectedPackage({
      name: pkg.name,
      movie: pkg.movie,
      book: pkg.book,
      music: pkg.music,
      show: pkg.show,
      game: pkg.game,
      newExperience: pkg.new,
      activity: pkg.activity,
    });

    await newPackage.save();

    res.status(201).json({ message: 'Package saved successfully!', package: newPackage });
  } catch (error) {
    console.error('Error saving full package:', error);
    res.status(500).json({ message: 'Failed to save package', error: error.message });
  }
});

module.exports = router;
