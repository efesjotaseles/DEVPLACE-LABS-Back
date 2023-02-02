const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../public/assets");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueString + file.originalname);
  },
});

const userImgUpload = multer({ storage: storage });

module.exports = { userImgUpload };
