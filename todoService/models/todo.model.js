const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  status: {
    required: true,
    type: String,
    default: "Draft"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, {
  timestamps: true,
  collection:"todo"
})

module.exports = mongoose.model("Todo", toDoSchema)