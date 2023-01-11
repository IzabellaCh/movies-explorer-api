const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const user = require('./users');
const movie = require('./movies');
const { login, createUser, signout } = require('../controllers/users');
const PageNotFoundError = require('../errors/pageNotFoundError');
const { signInInfo, signUpInfo } = require('./validationConstats');

router.post('/signin', celebrate({
  body: Joi.object().keys(signInInfo),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys(signUpInfo),
}), createUser);

router.use(auth);

router.use('/users', user);
router.use('/movies', movie);

router.post('/signout', signout);

router.use('/', (req, res, next) => {
  next(new PageNotFoundError());
});

module.exports = router;
