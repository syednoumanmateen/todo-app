const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
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
  collection: "category"
})

module.exports = mongoose.model("Categosy", categorySchema)