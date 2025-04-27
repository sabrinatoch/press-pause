// routes/ImageRetrieval.js
const express = require('express');
const router = express.Router();
const retrieveImage = require('../models/ImageRetrieval');

// Route to retrieve an image
router.get('/retrieve', async (req, res) => {
    try {
        // Extract query and type from the request
        const fullQuery = req.query.id;
        let type = 'general';
        
        // Determine content type from query
        const typeKeywords = ['movie', 'book', 'music', 'show', 'game', 'activity', 'new'];
        for (const keyword of typeKeywords) {
            if (fullQuery.endsWith(` ${keyword}`)) {
                type = keyword;
                break;
            }
        }
        
        const image = await retrieveImage(fullQuery, type);
        res.status(200).json(image);
    } catch (error) {
        console.error('Image retrieval error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;