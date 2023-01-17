const { Joi } = require('celebrate');

const signInInfo = {
  email: Joi.string().required().email(),
  password: Joi.string().required(),
};

const signUpInfo = {
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
};

const myInfo = {
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
};

const movieId = {
  movieId: Joi.string().hex(),
};

const movieInfo = {
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
  movieId: Joi.number().required(),
  thumbnail: Joi.string().required().pattern(/https?:\/\/\S+\.\S+/),
  trailerLink: Joi.string().required().pattern(/https?:\/\/\S+\.\S+/),
  image: Joi.string().required().pattern(/https?:\/\/\S+\.\S+/),
  description: Joi.string().required(),
  year: Joi.string().required(),
  duration: Joi.number().required(),
  director: Joi.string().required(),
  country: Joi.string().required(),
};

module.exports = {
  myInfo,
  signUpInfo,
  signInInfo,
  movieId,
  movieInfo,
};
