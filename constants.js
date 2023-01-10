const {
  PORT = 3000,
  mongoDB = 'mongodb://localhost:27017/movies-explorerdb',
  JWT_SECRET_DEV = 'some-secret-key',
} = process.env;

module.exports = {
  PORT,
  mongoDB,
  JWT_SECRET_DEV,
};
