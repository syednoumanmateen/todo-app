const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const expenseQuery = require("../queries/expense.query")

module.exports = {
  fetchAllExpense: async (userId) => {
    try {
      return await expenseQuery.fetchAllExpense(userId)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchExpense: async (userId, params) => {
    try {
      return await expenseQuery.fetchExpense(userId, params.id)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  createExpense: async (userId, data) => {
    try {
      const { name, amount, category, date } = data

      if (!name || !amount || !category || !date) throw customException.error(statusCode.BAD_REQUEST, "Please provide valid input", "Please provide valid input")
      await expenseQuery.addExpense({ ...data, userId, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateExpense: async (userId, params, data) => {
    try {
      await expenseQuery.updateExpense(params.id, { ...data, createdBy: userId, updatedBy: userId })
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteExpense: async (params) => {
    try {
      await expenseQuery.deleteExpense(params.id)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}