const expenseController = require("../controllers/expense.controller")
const authMiddleware = require("../../commonService/middlewares/auth.middleware")

module.exports = function (router) {
  router.get("/fetchAll", [authMiddleware.validateToken], expenseController.fetchAllExpense)
  router.get("/fetch/:id", [authMiddleware.validateToken], expenseController.fetchExpense)
  router.post("/create", [authMiddleware.validateToken], expenseController.createExpense)
  router.put("/update/:id", [authMiddleware.validateToken], expenseController.updateExpense)
  router.delete("/delete/:id", [authMiddleware.validateToken], expenseController.deleteExpense)
}