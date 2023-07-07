const mongoose = require("mongoose");
const Message = require("./Message");
const ConversationSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },

  message: {
    type: [Message],
    required: true,
  },
  /* timestamps: {
    createdAt: true,
    updatedAt: false,
  }, */
});

module.exports = mongoose.model("Conversation", ConversationSchema);
