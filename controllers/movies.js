const { StatusCodes } = require("http-status-codes");
const Movie = require("../models/movie");
const ResourceNotFoundError = require("../errors/resourceNotFoundError");
const NotOwnerError = require("../errors/notOwnerError");
const BadRequestError = require("../errors/badRequestError");

const getMovies = (req, res, next) => {
  const id = req.user._id;
  Movie.find({ owner: req.user._id })
    .populate(["owner"])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    movieId,
    thumbnail,
    trailerLink,
    image,
    description,
    year,
    duration,
    director,
    country,
  } = req.body;
  const { _id } = req.user;
  Movie.create({
    nameRU,
    nameEN,
    movieId,
    thumbnail,
    trailerLink,
    image,
    description,
    year,
    duration,
    director,
    country,
    owner: _id,
  })
    .then((movie) => res.status(StatusCodes.CREATED).send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new ResourceNotFoundError();
    })
    .then((movie) => {
      const owner = movie.owner._id.toString();
      const userId = req.user._id;
      if (owner !== userId) {
        throw new NotOwnerError();
      }
      Movie.findByIdAndRemove(movieId).then(() =>
        res.send({ message: "Фильм удален" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError());
      } else if (err.name === "ResourceNotFoundError") {
        next(new ResourceNotFoundError());
      } else if (err.name === "NotOwnerError") {
        next(new NotOwnerError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
