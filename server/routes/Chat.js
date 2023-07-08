const express = require("express");
const router = express.Router();
const conversation = require("../controllers/conversationController");
router
  .route("/chatbox/:userName/:contactName")
  .get(conversation.getConversation)
  .post(conversation.addConversation);

module.exports = router;
