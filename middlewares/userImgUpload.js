const multer = require("multer");
const { User } = require("../models/user.model");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/assets");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const finalFileName = uniqueString + file.originalname;
    req.body.finalFileName = finalFileName; //Se guarda el nombre que va a tener el archivo
    cb(null, finalFileName);
  },
});

const userImgUpload = multer({ storage: storage });

module.exports = { userImgUpload };
