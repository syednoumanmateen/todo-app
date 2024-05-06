const mongoose = require("mongoose")
const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const Category = require("../models/category.model")

module.exports = {
  fetchAllCategory: async () => {
    try {
      const result = await Category.aggregate([
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
            createdBy: "$createdBy",
            updatedBy: "$updatedBy",
            createdAt: 1,
            updatedAt: 1
          }
        }])

      if (result && result.length) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Category not found", "Category not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchCategoryById: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Category.aggregate([{ $match: { _id: objectId } },
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
          title: 1,
          summary: 1,
          cover: 1,
          category: "$category",
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
      throw customException.error(statusCode.NOT_FOUND, "Category not found", "Category not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  addCategory: async (data) => {
    try {
      const result = await Category.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to add category", "Failed to add category")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateCategory: async (id, data) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Category.findOneAndUpdate({ _id: objectId }, data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to update category", "Failed to update category")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteCategory: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Category.findOneAndDelete({ _id: objectId })
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to delete category", "Failed to delete category")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  countCategory: async () => {
    try {
      const result = await Category.find({}).countDocuments()
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