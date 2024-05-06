const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  summary: {
    required: true,
    type: String
  },
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Upload",
    required: true
  },
  description: {
    required: true,
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true
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
  collection: "blog"
})

module.exports = mongoose.model("Blog", blogSchema)