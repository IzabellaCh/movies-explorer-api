const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { limiter } = require('./rateLimiter');

const router = require('./routes/index');
const { PORT, mongoDB } = require('./constants');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://movie-project.nomoredomains.club',
    'https://movie-project.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

require('dotenv').config();

// подключеине логгера
app.use(requestLogger);

// ограничение количества запросов
app.use(limiter);

// настройка http-заголовков
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(mongoDB);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
