const messageController = require("../controllers/message.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")

module.exports = function (router) {
  router.post("/send/:id", [authMiddleware.validateToken], messageController.sendMessage)
  router.get("/:id", [authMiddleware.validateToken], messageController.getMessages)
}