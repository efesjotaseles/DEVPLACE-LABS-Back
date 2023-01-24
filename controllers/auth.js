const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* REGISTER USER */
const register = async (req, res) => {
    try {
      const {
        fname,
        lname,
        email,
        password,
        
      } = req.body;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
    // Creating a new User Object
      const newUser = new User({
        fname,
        lname,
        email,
        password: passwordHash,
        
      });
      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();

      // Create a token
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

      res.status(201).json({token});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  /* LOGGING IN */
const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Request body email can be an email
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });
      delete user.password;
      res.status(200).json({token});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {
    login,
    register,
  };