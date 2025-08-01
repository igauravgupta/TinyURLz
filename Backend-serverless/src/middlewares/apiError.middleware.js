export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.dala = null;
  }
}

export class ConflictError extends APIError {
    constructor(message = "Conflict occurred") {
      super(message, 409);
    }
  }

