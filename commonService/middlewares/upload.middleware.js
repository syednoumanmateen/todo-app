const fs = require("fs");
const multer = require("multer");
const path = require("path")

const uploadDirectory = "uploads/";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, 'profile-' + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage })

module.exports = {
  upload
}