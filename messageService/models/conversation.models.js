const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Types.ObjectId,
    ref: "user"
  }],
  messages: [{
    type: mongoose.Types.ObjectId,
    ref: "message",
    default: []
  }]
}, {
  timestamps: true,
  collection: "conversation"
})

module.exports = mongoose.model("Conversation", conversationSchema)
