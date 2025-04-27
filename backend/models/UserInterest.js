const mongoose = require('mongoose');

const UserInterestSchema = new mongoose.Schema({
  interests: {
    movies: [
      {
        title: { type: String, required: false },
        genre: { type: String, required: false }
      }
    ],
    shows: [
      {
        title: { type: String, required: false },
        genre: { type: String, required: false }
      }
    ],
    music: [
      {
        title: { type: String, required: false },
        genre: { type: String, required: false }
      }
    ],
    books: [
      {
        title: { type: String, required: false },
        genre: { type: String, required: false }
      }
    ],
    games: [
      {
        title: { type: String, required: false },
        genre: { type: String, required: false }
      }
    ],
    hobbies: [
      {
        title: { type: String, required: false },
        genre: { type: String, required: false }
      }
    ]
  },
  userId: { //TO-DO:will need to be changed to the authenticated user id later
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: false
});

module.exports = mongoose.model('UserInterest', UserInterestSchema);
