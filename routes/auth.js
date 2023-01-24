const express = require("express");
const { login, register } = require("../controllers/auth");
const { checkExistingUser } = require("../middleware/verifySingup");

const router = express.Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post("/login", login);
router.post("/register", checkExistingUser,register);

module.exports = router;