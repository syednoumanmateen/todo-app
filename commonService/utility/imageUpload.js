const fs = require("fs");
const customException = require("../customException");
const statusCode = require("../statusCode");
const constants = require("../constants");

module.exports = {
  bufferToUrl: async (bufferData) => {
    return await `data:image/png;base64,${bufferData.toString('base64')}`
  },
  uploadFile: async (file) => {
    try {
      const imgPath = file.path;
      const imgData = fs.readFileSync(imgPath)
      const contentType = file.mimetype;

      const upload = {
        data: imgData,
        contentType: contentType
      }

      fs.unlinkSync(imgPath);

      return upload
    } catch (e) {
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}