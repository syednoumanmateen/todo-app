const error = (errorCode, message, displayMessage, customStatusCode, customData) => {
  return {
    errorCode,
    message,
    displayMessage,
    customStatusCode,
    customData
  }
}

class customException extends Error {
  constructor(errorCode, message, displayMessage, customStatusCode, customData) {
    super(errorCode, message, displayMessage, customStatusCode, customData);
    this.errorCode = errorCode
    this.message = message
    this.displayMessage = displayMessage
    this.customStatusCode = customStatusCode
    this.customData = customData
  }
}

module.exports = {
  customException,
  error
}