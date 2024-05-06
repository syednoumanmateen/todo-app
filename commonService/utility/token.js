const jwt = require("jsonwebtoken");
const customException = require("../customException");
const statusCode = require("../statusCode");
const constants = require("../constants");
const secretKey = process.env.SECRET_KEY;

module.exports = {
  generateToken: async (userPayload, expiresIn) => {
    try {
      const token = await jwt.sign(userPayload, secretKey, { expiresIn });
      if (token) {
        return token
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to generate token", "Failed to generate token")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  verifyToken: async (token) => {
    try {
      const decoded = await jwt.verify(token, secretKey);
      if (decoded) {
        return decoded
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to verify token", "Failed to verify token")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  decodeToken: async (token) => {
    try {
      const decoded = await jwt.decode(token, secretKey);
      if (decoded) {
        return decoded
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to decode token", "Failed to decode token")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}