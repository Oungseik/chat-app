class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 400;
  }
}

class UnauthenticateError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 401;
  }
}

class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 404;
  }
}

module.exports = {
  BadRequestError,
  UnauthenticateError,
  ForbiddenError: UnauthorizedError,
  NotFoundError,
};
