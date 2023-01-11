const rateLimit = require('express-rate-limit');

// ограничение количества запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standartHeaders: true,
  legacyHeaders: true,
});

module.exports = { limiter };
