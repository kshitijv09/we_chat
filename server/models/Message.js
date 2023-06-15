const mongoose = require("mongoose");

const MsgSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_avatar: {
    type: String,
    required: false,
  },
  message_text: {
    type: String,
    required: true,
  },
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
});

module.exports = mongoose.model("Message", MsgSchema);
