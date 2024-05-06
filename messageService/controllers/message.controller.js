const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const messageService = require("../services/message.service")

module.exports = {
  /**
  * @swagger
  * /send/{id}:
  *   post:
  *     summary: Send message
  *     description: send message
  *     security:
  *       - cookieAuth: []
  *     parameters:
  *       - name: id       
  *         in: path
  *         description: ID of the task
  *         required: true
  *         schema:
  *           type: string
  *           format: objectId
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               message:
  *                 type: string
  *     responses:
  *       200:
  *         description: Message sent successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  sendMessage: async (req, res) => {
    try {
      const result = await messageService.sendMessage(req.userId, req.params, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Message sent successfully", "Message sent successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /{id}:
  *   get:
  *     summary: Send message
  *     description: send message
  *     security:
  *       - cookieAuth: []
  *     parameters:
  *       - name: id       
  *         in: path
  *         description: ID of the task
  *         required: true
  *         schema:
  *           type: string
  *           format: objectId
  *     responses:
  *       200:
  *         description: Message fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  getMessages: async (req, res) => {
    try {
      const result = await messageService.getMessages(req.userId,req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Message fetched successfully", "Message fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  }
}