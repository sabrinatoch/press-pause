const express = require('express');
const router = express.Router();
const UserInterest = require('../models/UserInterest'); 


router.post('/', async (req, res) => {
  try {
    const transformedData = {
      interests: {
        movies: transformInterestData(req.body.favoriteMovies, req.body.movieGenres),
        music: transformInterestData(req.body.favoriteMusic, req.body.musicGenres),
        books: transformInterestData(req.body.favoriteBooks, req.body.bookGenres),
        games: transformInterestData(req.body.favoriteGames, req.body.gameGenres),
        hobbies: req.body.hobbies ? [{ title: req.body.hobbies, genre: '' }] : []
      }
    };

    const userInterest = new UserInterest(transformedData);
    await userInterest.save();
    res.status(201).json({ message: 'Interests saved successfully!', userInterest });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error saving interests', error });
  }
});

function transformInterestData(favoriteItems, genres) {
  const result = [];
  

  if (genres && genres.length) {
    genres.forEach(genre => {
      result.push({ title: '', genre: genre });
    });
  }
  

  if (favoriteItems) {
    const items = favoriteItems.split(',').map(item => item.trim()).filter(item => item);
    items.forEach(item => {
      result.push({ title: item, genre: '' });
    });
  }
  
  return result;
}

module.exports = router;

