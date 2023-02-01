const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};