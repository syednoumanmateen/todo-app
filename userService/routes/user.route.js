const userController = require("../controllers/user.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")

module.exports = function (router) {
  router.get("/fetchAll", [authMiddleware.validateToken], userController.fetchAllUser)
  router.get("/message/fetchAll", [authMiddleware.validateToken], userController.fetchAllUserMessage)
  router.get("/fetch", [authMiddleware.validateToken], userController.fetchUser)
  router.post("/signUp", [], userController.signUp)
  router.post("/signIn", [], userController.signIn)
  router.post("/forgotPassword", [], userController.forgotPassword)
  router.post("/resetPassword", [], userController.resetPassword)
  router.post("/reload", [], userController.reload)
  router.post("/signOut", [], userController.signOut)
  router.put("/update", [authMiddleware.validateToken], userController.updateUser)
  router.delete("/delete", [authMiddleware.validateToken], userController.deleteUser)
}