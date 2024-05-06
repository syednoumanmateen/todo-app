const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const blogService = require("../services/blog.service")

module.exports = {
  /**
  * @swagger
  * /fetchAll:
  *   get:
  *     summary: Get all blogs
  *     description: get all blogs
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Blogs fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Images not found
  */
  fetchAllBlog: async (req, res) => {
    try {
      const result = await blogService.fetchAllBlog()
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Blog list fetched successfully", "Blog list fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /fetch/{id}:
  *   get:
  *     summary: Get blog
  *     description: get blog
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
  *         description: Blog fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  fetchBlog: async (req, res) => {
    try {
      const result = await blogService.fetchBlog(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Blog details fetched successfully", "Blog details fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /create:
  *   post:
  *     summary: Create blog
  *     description: create blog
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
  *         description: Blog created successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  createBlog: async (req, res) => {
    try {
      const result = await blogService.createBlog(req.userId, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Blog added successfully", "Blog added successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /update/{id}:
  *   put:
  *     summary: Update blog
  *     description: update blog
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
  *         description: Blog updated successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  updateBlog: async (req, res) => {
    try {
      const result = await blogService.updateBlog(req.userId, req.params, req.body)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Blog updated successfully", "Blog updated successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /delete/{id}:
  *   delete:
  *     summary: Delete blog
  *     description: delete blog
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
  *         description: blog deleted successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  deleteBlog: async (req, res) => {
    try {
      const result = await blogService.deleteBlog(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Blog deleted successfully", "Blog deleted successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  }
}