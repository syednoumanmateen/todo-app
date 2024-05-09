const customException = require("../customException")
const statusCode = require("../statusCode")
const tokenHelper = require("../utility/token")

module.exports = {
  validateToken: async (req, res, next) => {
    try {
      const token = req.cookies.token

      const verified = await tokenHelper.verifyToken(token)
      if (!verified) throw customException.error(statusCode.UN_AUTHORIZED, "un_authorized token", "un_authorized token")
      req.token = token
      req.userId = verified._id
      req.role = verified.role
      next()
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}