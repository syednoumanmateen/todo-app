const { default: mongoose } = require("mongoose")
const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const Conversation = require("../models/conversation.models")

module.exports = {
  addConversation: async (data) => {
    try {
      const result = await Conversation.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Failed to add conversation", "Failed to add conversation")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  fetchConversation: async (participants) => {
    try {
      const result = await Conversation.findOne({ participants })
      return result
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  fetchConversations: async (participants) => {
    try {
      const result = await Conversation.aggregate([{ $match: { participants } }, {
        $lookup: {
          from: "message",
          localField: "messages",
          foreignField: "_id",
          pipeline: [{ $project: { message: 1, senderId: 1, receiverId: 1, updatedAt: 1 } }],
          as: "populatedMessages"
        }
      }, {
        $unwind: {
          path: "$populatedMessages",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "user",
          localField: "populatedMessages.senderId",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, email: 1, createdAt: 1, updatedAt: 1 } }],
          as: "populatedSenderId"
        }
      }, {
        $lookup: {
          from: "user",
          localField: "populatedMessages.receiverId",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, email: 1, createdAt: 1, updatedAt: 1 } }],
          as: "populatedReceiverId"
        }
      }, {
        $lookup: {
          from: "user",
          localField: "participants",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, email: 1, createdAt: 1, updatedAt: 1 } }],
          as: "populatedParticipants"
        }
      }, {
        $group: {
          _id: "$_id",
          messages: {
            $push: {
              message: "$populatedMessages.message",
              senderId: { $arrayElemAt: ["$populatedSenderId", 0] },
              receiverId: { $arrayElemAt: ["$populatedReceiverId", 0] },
              createdAt: "$populatedMessages.createdAt",
              updatedAt: "$populatedMessages.updatedAt"
            }
          },
          participants: { $push: "$populatedParticipants" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updateddAt" }
        }
      }, {
        $project: {
          participants: "$participants",
          messages: "$messages",
          createdAt: 1,
          updatedAt: 1
        }
      }])

      return result
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  updateConversation: async (id, data) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id)
      const result = await Conversation.findOneAndUpdate({ _id: objectId }, data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Failed to update conversation", "Failed to update conversation")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  }
}