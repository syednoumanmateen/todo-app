const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  upload: {
    data: Buffer,
    contentType: String
  }
}, {
  timestamps: true,
  collection:"upload"
})

module.exports = mongoose.model("Upload", uploadSchema)