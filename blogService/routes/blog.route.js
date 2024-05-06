const blogController = require("../controllers/blog.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")

module.exports = function (router) {
  router.get("/fetchAll", [authMiddleware.validateToken], blogController.fetchAllBlog)
  router.get("/fetch/:id", [authMiddleware.validateToken], blogController.fetchBlog)
  router.post("/create", [authMiddleware.validateToken], blogController.createBlog)
  router.put("/update/:id", [authMiddleware.validateToken], blogController.updateBlog)
  router.delete("/delete/:id", [authMiddleware.validateToken], blogController.deleteBlog)
}