class UserError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  message() {
    return this.message;
  }

  status() {Ｆ
    return this.status;
  }
}

module.exports = UserError;
