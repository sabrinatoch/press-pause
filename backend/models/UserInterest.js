const mongoose = require('mongoose');

//will need to be changed later, just donig this for testing
const UserInterestSchema = new mongoose.Schema({
  movieGenres: [String],
  favoriteMovies: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserInterest', UserInterestSchema);
