const Conversation = require("../models/Conversation");

const getConversation = async (req, res) => {
  const contactName = req.params.contactName;
  try {
    const conversation = await Conversation.find({ contactName });
    res.json({ conversation });
  } catch {
    console.log("Error retrieving conversations:", err);
    res.sendStatus(500);
  }
};
module.exports = { getConversation };
