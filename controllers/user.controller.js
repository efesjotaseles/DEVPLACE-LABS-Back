const { User } = require('../models/user.model');

const createUser = async (req, res) => {
    const user = User(req.body);
    user.save().catch((error) => {console.log(error)});
    res.json(user);
}

const getUsers = async (req, res) => {
    const user = await User.find();
    
    res.json(user);
}

const findByUser = async (req, res) => {
    const { id } = req.params; 
    const user = await User.findById(id);
    
    res.json(user); 
}

const UpdateByUser = async (req, res) => {
    const { id } = req.params;
    await User.updateOne({ _id: id }, req.body);
    res.json({ 'message': 'Datos Modificados' });
}

const deleteByUser = async (req, res) => {
    const { id } = req.params; 
    await User.remove({ _id: id });
    res.json({ 'message': 'Datos Eliminados' });
}

 
module.exports = { getUsers, createUser, findByUser, UpdateByUser, deleteByUser }