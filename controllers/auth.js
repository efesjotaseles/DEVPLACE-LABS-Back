const User = require("../models/user.model");
const bcrypt = require("bcrypt"); //sirve para censurar la contra en la base de datos

//REGISTER
const registerUser = async(req,res) => {
    try {
        //genera contraseña nueva
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //crea nuevo usuarip
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //guarda el usuario y devuelve res
        const user = await newUser.save();
        res
            .status(200)
            .json(user);
            
    } catch(err) {
        res.status(500).json(err);  
    }
}

//LOGIN
const loginUser = async(req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});//Busca usuario por email
        !user && res.status(404).json("user not found"); //Si no lo encuentra devuelve 404

        const validPassword = await bcrypt.compare(req.body.password, user.password)//Compara password de la req con la del usuario encontrado
        !validPassword && res.status(400).json("wrong password")//Devuelve wrong password en caso de no matchear

        res.status(200).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = { registerUser, loginUser }