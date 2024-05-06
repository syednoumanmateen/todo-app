const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const Message = require("../models/message.model")

module.exports = {
  addMessage: async (data) => {
    try {
      const result = await Message.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Failed to add message", "Failed to add message")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  }
}