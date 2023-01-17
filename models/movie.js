const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        const link = /https?:\/\/\S+\.\S+/;
        return link.test(image);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(trailer) {
        const link = /https?:\/\/\S+\.\S+/;
        return link.test(trailer);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(poster) {
        const link = /https?:\/\/\S+\.\S+/;
        return link.test(poster);
      },
    },
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
