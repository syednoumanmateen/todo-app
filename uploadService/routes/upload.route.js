const uploadController = require("../controllers/upload.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")
const uploadMiddleware = require("../../commonService/middlewares/upload.middleware")

module.exports = function (router) {
  router.get("/fetchAll", [authMiddleware.validateToken], uploadController.fetchAllImage)
  router.get("/fetch/:id", [authMiddleware.validateToken], uploadController.fetchImage)
  router.post("/create", [authMiddleware.validateToken, authMiddleware.validateToken, uploadMiddleware.upload.single("upload")], uploadController.createImage)
  router.post("/createMulti", [uploadMiddleware.upload.array("upload")], uploadController.createMultiImage)
  router.delete("/delete/:id", [authMiddleware.validateToken], uploadController.deleteImage)
}