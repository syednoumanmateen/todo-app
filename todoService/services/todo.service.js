const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const todoQuery = require("../queries/todo.query")

module.exports = {
  fetchAllToDo: async () => {
    try {
      return await todoQuery.fetchAllTodo()
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchTask: async (params) => {
    try {
      return await todoQuery.fetchTaskById(params.id)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  createTask: async (userId, data) => {
    try {
      const { name, description } = data

      if (!name || !description) throw customException.error(statusCode.BAD_REQUEST, "Please provide valid input", "Please provide valid input")
      await todoQuery.addTask({ ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateTask: async (userId, params, data) => {
    try {
      await todoQuery.updateTask(params.id, { ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteTask: async (params) => {
    try {
      await todoQuery.deleteTask(params.id)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  countTodo: async () => {
    try {
      return await todoQuery.countTodo()
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}