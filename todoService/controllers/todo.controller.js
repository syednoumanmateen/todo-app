const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const todoService = require("../services/todo.service")

module.exports = {
  /**
  * @swagger
  * /fetchAll:
  *   get:
  *     summary: Get all todo
  *     description: get all todo
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Todo fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Images not found
  */
  fetchAllToDo: async (req, res) => {
    try {
      const result = await todoService.fetchAllToDo()
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Todo list fetched successfully", "Todo list fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /fetch/{id}:
  *   get:
  *     summary: Get task
  *     description: get task
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
  *         description:  Task fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */                      
  fetchTask: async (req, res) => {
    try {
      const result = await todoService.fetchTask(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Task details fetched successfully", "Task details fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /create:
  *   post:
  *     summary: Create task
  *     description: create task
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
  *         description: Task created successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  createTask: async (req, res) => {
    try {
      const result = await todoService.createTask(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Task added successfully", "Task added successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /update/{id}:
  *   put:
  *     summary: Update task
  *     description: update task
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
  *         description: Task updated successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  updateTask: async (req, res) => {
    try {
      const result = await todoService.updateTask(req.userId, req.params, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Task updated successfully", "Task updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /delete/{id}:
  *   delete:
  *     summary: Delete task
  *     description: delete task
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
  *         description: Task deleted successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  deleteTask: async (req, res) => {
    try {
      const result = await todoService.deleteTask(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Task deleted successfully", "Task deleted successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
   /**
  * @swagger
  * /count:
  *   get:
  *     summary: Get all todo count
  *     description: get all todo count
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Todo count fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Images not found
  */
  countTodo: async (req, res) => {
    try {
      const result = await todoService.countTodo()
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Todo count fetched successfully", "Todo count fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
}