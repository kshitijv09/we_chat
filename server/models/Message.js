const mongoose = require("mongoose");

const MsgSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  /* user_avatar: {
    type: String,
    required: false,
  }, */
  message: {
    type: String,
    required: true,
  },
  createdtime: {
    type: String,
    default: `${new Date().getHours()}:${new Date().getMinutes()}`,
  },
  /* timestamps: {
    createdAt: true,
    updatedAt: false,
  }, */
});

module.exports = mongoose.model("Message", MsgSchema);
