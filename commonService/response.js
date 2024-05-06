const statusCode = require("./statusCode")

module.exports = {
  successWith: (data, httpStatusCode, message, displayMessage, customStatusCode, customData) => {
    if (!httpStatusCode) httpStatusCode = statusCode.SUCCESS
    if (!message)message=constants
    return {
      httpStatusCode,
      customStatusCode,
      result: { data, customData },
      message,
      displayMessage
    }
  },
  errorWith: (httpStatusCode, message, displayMessage, customStatusCode, customData) => {
    return {
      httpStatusCode,
      customStatusCode,
      result: { data: null, customData },
      message,
      displayMessage
    }
  }
}