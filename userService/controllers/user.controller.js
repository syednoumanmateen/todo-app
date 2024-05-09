const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const userService = require("../services/user.service")

module.exports = {
  /**
  * @swagger
  * /message/fetchAll:
  *   get:
  *     summary: Get all users
  *     description: get all users
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Users fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  fetchAllUserMessage: async (req, res) => {
    try {
      const result = await userService.fetchAllUserMessage(req.userId)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Users fetched successfully", "Users fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
 * @swagger
 * /fetchAll:
 *   get:
 *     summary: Get all users
 *     description: get all users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Not found
 */
  fetchAllUser: async (req, res) => {
    try {
      const result = await userService.fetchAllUser()
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Users fetched successfully", "Users fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
 * @swagger
 * /fetch:
 *   get:
 *     summary: Get user
 *     description: get user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Not found
 */
  fetchUser: async (req, res) => {
    try {
      const result = await userService.fetchUser(req.userId)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "User fetched successfully", "User fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /signUp:
  *   post:
  *     summary: Sign Up
  *     description: sign up
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -name
  *               -email
  *               -password
  *               -gender
  *             properties:
  *               name:
  *                 type: string
  *               email:
  *                 type: string
  *               password:
  *                 type: string
  *               gender:
  *                 type: string
  *               profile:
  *                 type: string  
  *                 format: objectId
  *     responses:
  *       200:
  *         description: Sign up successfull
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  signUp: async (req, res) => {
    try {
      const result = await userService.signUp(req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Sign up successfull", "Sign up successfull"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /signIn:
  *   post:
  *     summary: Sign In
  *     description: sign in
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -email
  *               -password
  *             properties:
  *               email:
  *                 type: string
  *               password:
  *                 type: string
  *     responses:
  *       200:
  *         description: Sign in successfull
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  signIn: async (req, res) => {
    try {
      const result = await userService.signIn(req.body, res)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Sign in successfull", "Sign in successfull"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /forgotPassword:
  *   post:
  *     summary: Forgot password
  *     description: forgot password
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -email
  *             properties:
  *               email:
  *                 type: string
  *     responses:
  *       200:
  *         description: Reset password link sent,Please check the mail
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  forgotPassword: async (req, res) => {
    try {
      const result = await userService.forgotPassword(req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Reset password link sent,Please check the mail", "Reset password link sent,Please check the mail"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /resetPassword:
  *   post:
  *     summary: Reset password
  *     description: reset password
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -resetToken
  *               -password
  *             properties:
  *               resetToken:
  *                 type: string
  *                 format: objectId
  *               password:
  *                 type: string
  *     responses:
  *       200:
  *         description: Reset password successfull
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  resetPassword: async (req, res) => {
    try {
      const result = await userService.resetPassword(req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Reset password successfull", "Reset password successfull"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /reload:
  *   post:
  *     summary: Reload
  *     description: reload
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -token
  *             properties:
  *               token:
  *                 type: string
  *     responses:
  *       200:
  *         description: Reload successfull
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  reload: async (req, res) => {
    try {
      const result = await userService.reload(req.body, res)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Reload successfull", "Reload successfull"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /signOut:
  *   post:
  *     summary: Sign out
  *     description: sign out
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Sign out successfull
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  signOut: async (req, res) => {
    try {
      const result = await userService.signOut(res)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Sign out successfull", "Sign out successfull"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /update:
  *   put:
  *     summary: Update user
  *     description: update user
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *               email:
  *                 type: string
  *               profile:
  *                 type: string  
  *                 format: objectId
  *               isPublicProfile:
  *                 type: boolean
  *               role:
  *                 type: string
  *     responses:
  *       200:
  *         description: User updated successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  updateUser: async (req, res) => {
    try {
      const result = await userService.updateUser(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "User updated successfully", "User updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /update/role:
  *   put:
  *     summary: Update user role
  *     description: update user role
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               role:
  *                 type: string
  *     responses:
  *       200:
  *         description: User role updated successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  updateUserRole: async (req, res) => {
    try {
      const result = await userService.updateUseRole(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "User role updated successfully", "User role updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
 * @swagger
 * /update/profileAccess:
 *   put:
 *     summary: Update user role
 *     description: update user role
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPublicProfile:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User profile access updated successfully
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Not found
 */
  updateUserProfileAccess: async (req, res) => {
    try {
      const result = await userService.updateUserProfileAccess(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "User profile access updated successfully", "User profile access updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /delete:
  *   delete:
  *     summary: Delete user
  *     description: delete user
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: User deleted successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  deleteUser: async (req, res) => {
    try {
      const result = await userService.deleteUser(req.userId)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "User deleted successfully", "User deleted successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
}