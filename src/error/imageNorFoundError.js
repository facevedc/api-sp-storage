const messages = require("../config/errorMessage").messages;

class ImageNotFoundError extends Error {
  constructor(error) {
    if (error) {
      super(error);
    } else {
      super(messages.notFoundImage);
    }
  }
}

module.exports = ImageNotFoundError;
