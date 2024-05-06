const mongoose = require("mongoose")
const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const Blog = require("../models/blog.model")
const imageUpload = require("../../commonService/utility/imageUpload")

module.exports = {
  fetchAllBlog: async () => {
    try {
      let result = await Blog.aggregate([{
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
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
          from: "upload",
          localField: "cover",
          foreignField: "_id",
          as: "cover"
        }
      },
      {
        $unwind: {
          path: "$cover",
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
          category: "$category",
          cover:1,
          coverImg: "$cover.upload",
          description: 1,
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          createdAt: 1,
          updatedAt: 1
        }
      }])

      if (result && result.length) {
        result = await Promise.all(result.map(async (cov) => {
          return {
            ...cov,
            coverImg: await imageUpload.bufferToUrl(cov?.coverImg?.data)
          }
        }))

        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Blog not found", "Blog not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchBlogById: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      let result = await Blog.aggregate([{ $match: { _id: objectId } }, {
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
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
          from: "upload",
          localField: "cover",
          foreignField: "_id",
          as: "cover"
        }
      },
      {
        $unwind: {
          path: "$cover",
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
          category: "$category",
          cover:1,
          coverImg: "$cover.upload",
          description: 1,
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          createdAt: 1,
          updatedAt: 1
        }
      }])

      if (result && result.length) {
        result = await Promise.all(result.map(async (cov) => {
          return {
            ...cov,
            coverImg: await imageUpload.bufferToUrl(cov?.coverImg?.data)
          }
        }))

        return result[0]
      }
      throw customException.error(statusCode.NOT_FOUND, "Blog not found", "Blog not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  addBlog: async (data) => {
    try {
      const result = await Blog.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to add blog", "Failed to add blog")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateBlog: async (id, data) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Blog.findOneAndUpdate({ _id: objectId }, data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to update blog", "Failed to update blog")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteBlog: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Blog.findOneAndDelete({ _id: objectId })
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to delete blog", "Failed to delete blog")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  countBlog: async () => {
    try {
      const result = await Blog.find({}).countDocuments()
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