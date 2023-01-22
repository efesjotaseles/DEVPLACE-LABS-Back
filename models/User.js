const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      fname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 5,
      },
    },
    {collection: "UserInfo"}
  );
  
  module.exports = mongoose.model("user",UserSchema);