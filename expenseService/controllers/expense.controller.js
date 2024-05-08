const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const expenseService = require("../services/expense.service")

module.exports = {
  /**
  * @swagger
  * /fetchAll:
  *   get:
  *     summary: Get all expense
  *     description: get all expense
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Expense fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Images not found
  */
  fetchAllExpense: async (req, res) => {
    try {
      const result = await expenseService.fetchAllExpense(req.userId)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Expense list fetched successfully", "Expense list fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
* @swagger
* /fetch/{id}:
*   get:
*     summary: Get expense
*     description: get expense
*     security:
*       - cookieAuth: []
*     parameters:
*       - name: id       
*         in: path
*         description: ID of the image
*         required: true
*         schema:
*           type: string
*           format: objectId
*     responses:
*       200:
*         description: Expense fetched successfully
*       500:
*         description: Server error
*       400:
*         description: Bad request
*       401:
*         description: Unauthorized access
*       404:
*         description: Images not found
*/
  fetchExpense: async (req, res) => {
    try {
      const result = await expenseService.fetchExpense(req.userId, req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Expense list fetched successfully", "Expense list fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /create:
  *   post:
  *     summary: Create expense
  *     description: create expense
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -name
  *               -description
  *             properties:
  *               name:
  *                 type: string
  *               description:
  *                 type: string
  *     responses:
  *       200:
  *         description: Expense created successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  createExpense: async (req, res) => {
    try {
      const result = await expenseService.createExpense(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Expense added successfully", "Expense added successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /update/{id}:
  *   put:
  *     summary: Update expense
  *     description: update expense
  *     security:
  *       - cookieAuth: []
  *     parameters:
  *       - name: id       
  *         in: path
  *         description: ID of the image
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
  *               name:
  *                 type: string
  *               description:
  *                 type: string
  *     responses:
  *       200:
  *         description: Expense updated successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  updateExpense: async (req, res) => {
    try {
      const result = await expenseService.updateExpense(req.userId, req.params, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Expense updated successfully", "Expense updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /delete/{id}:
  *   delete:
  *     summary: Delete expense
  *     description: delete expense
  *     security:
  *       - cookieAuth: []
  *     parameters:
  *       - name: id       
  *         in: path
  *         description: ID of the expense
  *         required: true
  *         schema:
  *           type: string
  *           format: objectId
  *     responses:
  *       200:
  *         description: Expense deleted successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  deleteExpense: async (req, res) => {
    try {
      const result = await expenseService.deleteExpense(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Expense deleted successfully", "Expense deleted successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  }
}