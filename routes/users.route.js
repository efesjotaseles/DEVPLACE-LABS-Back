const express = require("express");
const router = express.Router();
const {getUsers,createUser,findByUser,UpdateByUser,deleteByUser} = require('../controllers/user.controller');

/**Get all users */
// router.get('/', (req, res) => {
//     res.send('FUCIONA!')
// });
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', findByUser);
router.put('/:id', UpdateByUser);
router.delete('/:id', deleteByUser);

module.exports=router;