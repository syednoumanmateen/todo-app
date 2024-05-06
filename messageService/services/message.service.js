const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const messageQuery = require("../queries/message.query")
const conversationQuery = require("../queries/conversation.query")
const mongoose = require("mongoose")
const { getReceiverSocketId } = require("../socket")

module.exports = {
  sendMessage: async (senderId, params, data) => {
    try {
      const { message } = data
      const receiverId = params.id
      const objectId = new mongoose.Types.ObjectId(receiverId)
      const senderObjectId = new mongoose.Types.ObjectId(senderId)

      let conversation = await conversationQuery.fetchConversation({ $all: [senderObjectId, objectId] })

      if (!conversation) {
        conversation = await conversationQuery.addConversation({ participants: [senderId, receiverId] })
      }

      const result = await messageQuery.addMessage({ senderId, receiverId, message })
      await conversationQuery.updateConversation(conversation._id, { $push: { messages: result._id } })

      const receiverSocketId = getReceiverSocketId(receiverId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", result)
      }

      return result
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  getMessages: async (senderId, params) => {
    try {
      const objectId = new mongoose.Types.ObjectId(params.id)
      const senderObjectId = new mongoose.Types.ObjectId(senderId)
      return await conversationQuery.fetchConversations({ $all: [senderObjectId, objectId] })
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}