const movie = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { movieId, movieInfo } = require('./validationConstats');

movie.get('/', getMovies);

movie.post('/', celebrate({
  body: Joi.object().keys(movieInfo),
}), createMovie);

movie.delete('/:movieId', celebrate({
  params: Joi.object().keys(movieId),
}), deleteMovie);

module.exports = movie;
