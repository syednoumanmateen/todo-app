const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const categoryService = require("../services/category.service")

module.exports = {
  /**
  * @swagger
  * /cat/fetchAll:
  *   get:
  *     summary: Get all categorys
  *     description: get all categorys
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Categorys fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Images not found
  */
  fetchAllCategory: async (req, res) => {
    try {
      const result = await categoryService.fetchAllCategory()
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Category list fetched successfully", "Category list fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /cat/fetch/{id}:
  *   get:
  *     summary: Get category
  *     description: get category
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
  *         description: Category fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  fetchCategory: async (req, res) => {
    try {
      const result = await categoryService.fetchCategory(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Category details fetched successfully", "Category details fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /cat/create:
  *   post:
  *     summary: Create category
  *     description: create category
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               -title
  *               -summary
  *               -description
  *               -cover
  *             properties:
  *               title:
  *                 type: string
  *               summary:
  *                 type: string
  *               description:
  *                 type: string
  *               cover:
  *                 type: string  
  *                 format: objectId
  *     responses:
  *       200:
  *         description: Category created successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  createCategory: async (req, res) => {
    try {
      const result = await categoryService.createCategory(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Category added successfully", "Category added successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /cat/update/{id}:
  *   put:
  *     summary: Update category
  *     description: update category
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
  *               title:
  *                 type: string
  *               summary:
  *                 type: string
  *               description:
  *                 type: string
  *               cover:
  *                 type: string  
  *                 format: objectId
  *     responses:
  *       200:
  *         description: Category updated successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  updateCategory: async (req, res) => {
    try {
      const result = await categoryService.updateCategory(req.userId, req.params, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Category updated successfully", "Category updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /cat/delete/{id}:
  *   delete:
  *     summary: Delete category
  *     description: delete category
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
  *         description: category deleted successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  deleteCategory: async (req, res) => {
    try {
      const result = await categoryService.deleteCategory(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Category deleted successfully", "Category deleted successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  }
}