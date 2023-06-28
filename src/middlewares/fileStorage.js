const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function(_req, _file, cb) {
    cb(null, './public/uploads')
  },

  filename: function(_req, file, cb) {
    cb(null, crypto.randomUUID() + "-" + file.originalname)
  }
})

const upload = multer({ storage });

module.exports = {
  upload
}
