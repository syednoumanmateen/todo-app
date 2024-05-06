const mongoose = require("mongoose")
const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const Expense = require("../models/expense.model")

module.exports = {
  fetchAllExpense: async (userId) => {
    try {
      const objectId = new mongoose.Types.ObjectId(userId)
      const result = await Expense.aggregate([{ $match: { userId: objectId } },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, email: 1, createdAt: 1, updatedAt: 1 } }],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, createdAt: 1, updatedAt: 1 } }],
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "user",
          localField: "createdBy",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, email: 1, createdAt: 1, updatedAt: 1 } }],
          as: "createdBy"
        }
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "user",
          localField: "updatedBy",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1, email: 1, createdAt: 1, updatedAt: 1 } }],
          as: "updatedBy"
        }
      },
      {
        $unwind: {
          path: "$updatedBy",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $project: {
          name: 1,
          amount: 1,
          description: 1,
          type: 1,
          category: "$category",
          user: "$user",
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          createdAt: 1,
          updatedAt: 1,
          totalAmount: 1
        }
      }, {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
          List: { $push: '$$ROOT' }
        }
      }])

      if (result && result.length) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Expense not found", "Expense not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  addExpense: async (data) => {
    try {
      const result = await Expense.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to add expense", "Failed to add expense")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateExpense: async (id, data) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Expense.findOneAndUpdate({ _id: objectId }, data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to update expense", "Failed to update expense")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteExpense: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Expense.findOneAndDelete({ _id: objectId })
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to delete expense", "Failed to delete expense")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}