const todoController = require("../controllers/todo.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")

module.exports = function (router) {
  router.get("/fetchAll", [authMiddleware.validateToken], todoController.fetchAllToDo)
  router.get("/fetch/:id", [authMiddleware.validateToken], todoController.fetchTask)
  router.post("/create", [authMiddleware.validateToken], todoController.createTask)
  router.put("/update/:id", [authMiddleware.validateToken], todoController.updateTask)
  router.delete("/delete/:id", [authMiddleware.validateToken], todoController.deleteTask)
  router.get("/count", [authMiddleware.validateToken], todoController.countTodo)
}