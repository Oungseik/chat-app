// @ts-check
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, index: true, require: true, min: 3, max: 20, unique: true },
  email: { type: String, require: true, unique: true, max: 50 },
  password: { type: String, require: true, min: 4, max: 30 },
  isAvatarImageSet: { type: Boolean, default: false },
  avatarImage: { type: String, default: "" },
  fullname: { type: String, default: "" },
});

module.exports = mongoose.model("Users", userSchema);
