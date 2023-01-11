class NotOwnerError extends Error {
  constructor() {
    super();
    this.name = 'NotOwnerError';
    this.statusCode = 403;
    this.message = 'Только сохранивший фильм пользователь может его удалить';
  }
}

module.exports = NotOwnerError;
