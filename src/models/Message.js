//@ts-check
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    images: [{ type: String }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messageSchema);
