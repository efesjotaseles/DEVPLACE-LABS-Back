const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next)=>{
    try {
     const token = req.headers["x-access-token"];

     console.log(token);
     if (!token) return res.status(403).json({message: "no token provided"});

     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     req.userId = decoded.id;

     const user = await User.findById(req.userId, {password: 0});
     if (!user) return res.status(404).json({message: 'no user found'});
     next();
    } catch (error) {
     return res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports = {
     verifyToken,
}