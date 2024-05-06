const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const blogQuery = require("../queries/blog.query")

module.exports = {
  fetchAllBlog: async () => {
    try {
      return await blogQuery.fetchAllBlog()
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchBlog: async (params) => {
    try {
      return await blogQuery.fetchBlogById(params.id)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  createBlog: async (userId, data) => {
    try {
      const { title, summary, description, category, cover } = data

      if (!title || !summary || !description || !category || !cover) throw customException.error(statusCode.BAD_REQUEST, "Please provide valid input", "Please provide valid input")

      await blogQuery.addBlog({ ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateBlog: async (userId, params, data) => {
    try {
      await blogQuery.updateBlog(params.id, { ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteBlog: async (params) => {
    try {
      await blogQuery.deleteBlog(params.id)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}