const user = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMyProfile,
  updateProfile,
} = require('../controllers/users');

user.get('/me', getMyProfile);
user.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = user;
