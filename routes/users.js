const user = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { myInfo } = require('./validationConstats');

const {
  getMyProfile,
  updateProfile,
} = require('../controllers/users');

user.get('/me', getMyProfile);
user.patch('/me', celebrate({
  body: Joi.object().keys(myInfo),
}), updateProfile);

module.exports = user;
