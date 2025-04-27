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
  userId: {
    type: String,
    default: "1",
    required: false
  }
}, {
  timestamps: false
});

module.exports = mongoose.model('UserInterest', UserInterestSchema);