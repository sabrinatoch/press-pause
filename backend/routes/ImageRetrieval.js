// routes/ImageRetrieval.js
const express = require('express');
const router = express.Router(); // <- You forgot to create router here
const retrieveImage = require('../models/ImageRetrieval');

// Route to retrieve an image
router.post('/retrieve', async (req, res) => {
    try {
        const image = await retrieveImage(req.query.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
