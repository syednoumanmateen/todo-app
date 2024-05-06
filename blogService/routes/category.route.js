const categoryController = require("../controllers/category.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")

module.exports = function (router) {
  router.get("/cat/fetchAll", [authMiddleware.validateToken], categoryController.fetchAllCategory)
  router.get("/cat/fetch/:id", [authMiddleware.validateToken], categoryController.fetchCategory)
  router.post("/cat/create", [authMiddleware.validateToken], categoryController.createCategory)
  router.put("/cat/update/:id", [authMiddleware.validateToken], categoryController.updateCategory)
  router.delete("/cat/delete/:id", [authMiddleware.validateToken], categoryController.deleteCategory)
}