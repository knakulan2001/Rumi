class NotificationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  message() {
    return this.message;
  }

  status() {
    return this.status;
  }
}

module.exports = NotificationError;
