const express = require('express');
const retrieveImage = require('../models/ImageRetrieval');


const router = express.Router();

// Route to retrieve an image
router.get('/retrieve', async (req, res) => {
    try {
        const image = await retrieveImage(req.query.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;