const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  findByUser,
  updateByUser,
  deleteByUser,
  uploadUserImg,
} = require("../controllers/user.controller");
const { userImgUpload } = require("../middlewares/userImgUpload");

/**Get all users */
// router.get('/', (req, res) => {
//     res.send('FUCIONA!')
// });
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", findByUser);
router.put("/:id", updateByUser);
router.delete("/:id", deleteByUser);
router.put("/userimg/:id", userImgUpload.single("userimg"), uploadUserImg);

module.exports = router;
