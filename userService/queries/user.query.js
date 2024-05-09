const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const helper = require("../../commonService/utility/helper")
const imageUpload = require("../../commonService/utility/imageUpload")
const User = require("../models/user.model")
const mongoose = require("mongoose")

module.exports = {
  fetchAllUser: async () => {
    try {
      let result = await User.aggregate([
        {
          $lookup: {
            from: "upload",
            localField: "profile",
            foreignField: "_id",
            as: "profile"
          }
        },
        {
          $unwind: {
            path: "$profile",
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
            email: 1,
            profile: 1,
            isPublicProfile: 1,
            profileImg: "$profile.upload",
            gender: 1,
            role: 1,
            bio: 1,
            createdBy: "$createdBy",
            updatedBy: "$updatedBy",
            createdAt: 1,
            updatedAt: 1
          }
        }])

      if (result && result.length) {
        result = await Promise.all(result.map(async (prof) => {
          return {
            ...prof,
            profile: (prof.role === "admin" || prof.isPublicProfile) ? prof.profile : null,
            profileImg: (prof.role === "admin" || prof.isPublicProfile) ? await imageUpload.bufferToUrl(prof?.profileImg?.data) : null
          }
        }))

        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "User not found", "User not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  fetchAllUserMessage: async (userId) => {
    try {
      let result = await User.aggregate([{ $match: { $ne: userId } },
      {
        $lookup: {
          from: "upload",
          localField: "profile",
          foreignField: "_id",
          as: "profile"
        }
      },
      {
        $unwind: {
          path: "$profile",
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
          email: 1,
          profile: 1,
          isPublicProfile: 1,
          profileImg: "$profile.upload",
          gender: 1,
          role: 1,
          bio: 1,
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          createdAt: 1,
          updatedAt: 1
        }
      }])

      if (result && result.length) {
        result = await Promise.all(result.map(async (prof) => {
          return {
            ...prof,
            profile: (prof.role === "admin" || prof.isPublicProfile) ? prof.profile : null,
            profileImg: (prof.role === "admin" || prof.isPublicProfile) ? await imageUpload.bufferToUrl(prof?.profileImg?.data) : null
          }
        }))

        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "User not found", "User not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  fetchUserById: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      let result = await User.aggregate([{ $match: { _id: objectId } }, {
        $lookup: {
          from: "upload",
          localField: "profile",
          foreignField: "_id",
          as: "profile"
        }
      },
      {
        $unwind: {
          path: "$profile",
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
          email: 1,
          profile: 1,
          isPublicProfile: 1,
          profileImg: "$profile.upload",
          gender: 1,
          role: 1,
          bio: 1,
          createdBy: "$createdBy",
          updatedBy: "$updatedBy",
          createdAt: 1,
          updatedAt: 1
        }
      }])

      if (result && result.length) {
        result = await Promise.all(result.map(async (prof) => {
          return {
            ...prof,
            profile: (prof.role === "admin" || prof.isPublicProfile) ? prof.profile : null,
            profileImg: (prof.role === "admin" || prof.isPublicProfile) ? await imageUpload.bufferToUrl(prof?.profileImg?.data) : null
          }
        }))

        return result[0]
      }
      throw customException.error(statusCode.NOT_FOUND, "User not found", "User not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  fetchUserByEmail: async (email) => {
    try {
      const result = await User.findOne({ email }).lean()
      if (result) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "User not found", "User not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  addUser: async (data) => {
    try {
      const result = await User.create(data)
      if (result) {
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "Failed to sign up", "Failed to sign up")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  fetchUserByToken: async (token) => {
    try {
      const result = await User.findOne({ resetToken: token }, { name: 1, email: 1, profile: 1, gender: 1 }).lean().lean()
      if (result) {
        await helper.validateTime(result.resetTokenExpiry)
        return result
      }
      throw customException.error(statusCode.NOT_FOUND, "User not found", "User not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.diplayMessage || constants.unknownErrorMessage)
    }
  },
  updateUser: async (id, data) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await User.findOneAndUpdate({ _id: objectId }, data).lean()
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to update user", "Failed to update user")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateUserPassword: async (id, password) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await User.findOneAndUpdate({ _id: objectId }, { password }).lean()
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to update user password", "Failed to update user password")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteUser: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await User.findOneAndDelete({ _id: objectId }).lean()
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to delete user", "Failed to delete user")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
}