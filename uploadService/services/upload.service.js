const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const uploadQuery = require("../queries/upload.query")
const imageUpload = require("../../commonService/utility/imageUpload")

module.exports = {
  fetchAllImage: async () => {
    try {
      return await uploadQuery.fetchAllImage()
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchImage: async (params) => {
    try {
      return await uploadQuery.fetchImageById(params.id)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  createImage: async (file) => {
    try {
      const upload = await imageUpload.uploadFile(file)
      return await uploadQuery.addImage({ upload })
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  createMultiImage: async (files) => {
    try {
      const images = await Promise.all(files.map(async (i) => {
        return { upload: await imageUpload.uploadFile(i) }
      }))
      return await uploadQuery.addMultiImage(images)
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteImage: async (params) => {
    try {
      await uploadQuery.deleteImage(params.id)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}