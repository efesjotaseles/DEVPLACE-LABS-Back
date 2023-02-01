const express = require("express");
const router = express.Router();
const { getUser, getUserFriends, addRemoveFriend } = require('../controllers/user.controller');
const { verifyToken } = require("../middleware/auth");


router.get("/:id",getUser);
router.get("/:id/friends" ,getUserFriends);

router.patch("/:id/:friendId",addRemoveFriend);

module.exports = router;