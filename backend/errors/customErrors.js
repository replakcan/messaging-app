class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 404
    this.name = 'NotFoundError'
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 403
    this.name = 'ForbiddenError'
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
    this.status = 401
  }
}

class ConflictError extends Error {
  constructor(message = 'Resource already exists') {
    super(message)
    this.statusCode = 409
    this.name = 'ConflictError'
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
}
