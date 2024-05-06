const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  amount: {
    required: true,
    type: Number
  },
  date: {
    required: true,
    type: Date
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    default: 'expense'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  collection: "expense"
})

module.exports = mongoose.model("Expense", expenseSchema)