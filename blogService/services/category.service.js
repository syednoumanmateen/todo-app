const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const categoryQuery = require("../queries/category.query")

module.exports = {
  fetchAllCategory: async () => {
    try {
      return await categoryQuery.fetchAllCategory()
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchCategory: async (params) => {
    try {
      return await categoryQuery.fetchCategoryById(params.id)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  createCategory: async (userId, data) => {
    try {
      const { name } = data

      if (!name) throw customException.error(statusCode.BAD_REQUEST, "Please provide valid input", "Please provide valid input")

      await categoryQuery.addCategory({ ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateCategory: async (userId, params, data) => {
    try {
      await categoryQuery.updateCategory(params.id, { ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteCategory: async (params) => {
    try {
      await categoryQuery.deleteCategory(params.id)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}