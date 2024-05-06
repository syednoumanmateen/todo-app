const mongoose = require("mongoose")
const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const Todo = require("../models/todo.model")

module.exports = {
  fetchAllTodo: async () => {
    try {
      const result = await Todo.aggregate([{
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
      },
      {
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
      },
      {
        $project: {
          name: 1,
          description: 1,
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          status: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }])

      if (result && result.length) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Todo not found", "Todo not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchTaskById: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Todo.aggregate([{ $match: { _id: objectId } },
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
          description: 1,
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          status: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }])

      if (result && result.length) {
        return result[0]
      }
      throw customException.error(statusCode.NOT_FOUND, "Task not found", "Task not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  addTask: async (data) => {
    try {
      const result = await Todo.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to add task", "Failed to add task")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateTask: async (id, data) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Todo.findOneAndUpdate({ _id: objectId }, data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to update task", "Failed to update task")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteTask: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Todo.findOneAndDelete({ _id: objectId })
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to delete task", "Failed to delete task")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  countTodo: async () => {
    try {
      const result = await Todo.find({}).countDocuments()
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to count todo", "Failed to count todo")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}