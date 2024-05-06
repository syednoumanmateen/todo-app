const response = require("../../commonService/response")
const statusCode = require("../../commonService/statusCode")
const uploadService = require("../services/upload.service")

module.exports = {
  /**
  * @swagger
  * /fetchAll:
  *   get:
  *     summary: Get all images
  *     description: get all images.
  *     security:
  *       - cookieAuth: []
  *     responses:
  *       200:
  *         description: Images fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Images not found
  */
  fetchAllImage: async (req, res) => {
    try {
      const result = await uploadService.fetchAllImage()
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Images fetched successfully", "Images fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /fetch/{id}:
  *   get:
  *     summary: Get image
  *     description: get image
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
  *         description:  Image fetched successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  fetchImage: async (req, res) => {
    try {
      const result = await uploadService.fetchImage(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Image fetched successfully", "Image fetched successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /create:
  *   post:
  *     summary: Upload image
  *     description: upload image
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               upload:
  *                 type: string
  *                 format: binary
  *     responses:
  *       200:
  *         description: Image uploaded successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  createImage: async (req, res) => {
    try {
      const result = await uploadService.createImage(req.file)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Image uploaded successfully", "Image uploaded successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /createMulti:
  *   post:
  *     summary: Upload images
  *     description: upload images
  *     security:
  *       - cookieAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               upload:
  *                 type: array
  *                 items:
  *                   type: string
  *                   format: binary
  *     responses:
  *       200:
  *         description: Images uploaded successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  createMultiImage: async (req, res) => {
    try {
      const result = await uploadService.createMultiImage(req.files)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Images uploaded successfully", "Images uploaded successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  },
  /**
  * @swagger
  * /delete/{id}:
  *   delete:
  *     summary: Delete image
  *     description: delete image
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
  *         description: Image deleted successfully
  *       500:
  *         description: Server error
  *       400:
  *         description: Bad request
  *       401:
  *         description: Unauthorized access
  *       404:
  *         description: Not found
  */
  deleteImage: async (req, res) => {
    try {
      const result = await uploadService.deleteImage(req.params)
      res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Image deleted successfully", "Image deleted successfully"))
    } catch (e) {
      res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
    }
  }
}