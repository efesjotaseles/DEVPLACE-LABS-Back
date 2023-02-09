const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, getUser, followUser, unfollowUser } = require('../controllers/user.controller');
const { registerUser, loginUser } = require('../controllers/auth');

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)

router.get('/:id', getUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports=router;