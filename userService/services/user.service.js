const constants = require("../../commonService/constants")
const customException = require("../../commonService/customException")
const statusCode = require("../../commonService/statusCode")
const bcrypt = require("bcrypt")
const userQuery = require("../queries/user.query")
const tokenHelper = require("../../commonService/utility/token")
const emailHelper = require("../../commonService/utility/sendEmail")
const helper = require("../../commonService/utility/helper")
const { v4: uuid } = require("uuid")

module.exports = {
  fetchAllUser: async () => {
    try {
      return await userQuery.fetchAllUser()
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchAllUserMessage: async (userId) => {
    try {
      return await userQuery.fetchAllUserMessage(userId)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  fetchUser: async (id) => {
    try {
      return await userQuery.fetchUserById(id)
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  signUp: async (data) => {
    try {
      const { name, email, password, gender } = data
      if (!name || !email || !password || !gender) throw customException.error(statusCode.BAD_REQUEST, "Please proide the valid input", "Please proide the valid input")

      const result = await userQuery.addUser(data)
      return result
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  signIn: async (data, res) => {
    try {
      const { email, password } = data
      if (!email || !password) throw customException.error(statusCode.BAD_REQUEST, "Please proide the valid input", "Please proide the valid input")

      const user = await userQuery.fetchUserByEmail(email)

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw customException.error(statusCode.BAD_REQUEST, "Invalid email or password", "Invalid email or password")

      const token = await tokenHelper.generateToken({ _id: user._id }, "6h")
      res.cookie('token', token);

      const result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        profile: user.profile
      }
      return result
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  forgotPassword: async (data) => {
    try {
      const user = await userQuery.fetchUserByEmail(data.email)
      const objectId = uuid();

      const updateUser = await userQuery.updateUser(user._id, { resetToken: objectId, resetTokenExpiry: await helper.generateTime(constants.resetTokenExpiry) })

      if (updateUser) {
        const url = `${process.env.BASE_URL}/resetPassword/${user.email}/${objectId}`
        const html = `<div><a href=${url}>Reset password</a></div>`
        await emailHelper.sendEmail(user.email, "Reset password", html)

        return true
      }
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  resetPassword: async (data) => {
    try {
      const user = await userQuery.fetchUserByToken(data.token)
      await userQuery.updateUserPassword(user._id, data.password)
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  reload: async (data, res) => {
    try {
      const decode = await tokenHelper.decodeToken(data.token)
      const newToken = await tokenHelper.generateToken({ _id: decode._id }, "10h")

      res.cookie('token', newToken);
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  signOut: (res) => {
    try {
      res.cookie('token', '');
      return true
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  updateUser: async (id, data) => {
    try {
      await userQuery.updateUser(id, data)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteUser: async (id) => {
    try {
      await userQuery.deleteUser(id)
      return true
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
}