const ConversationModel = require("../models/Conversation");
//const Conversation=require("../models/")
const getConversation = async (req, res) => {
  const contactName = req.params.contactName;
  const userName = req.params.userName;
  //console.log("userName is,", userName);
  const Conversation = ConversationModel(userName);

  try {
    // console.log("Contact Name is", contactName);
    const conversation = await Conversation.find(/* { contactName } */);
    console.log("Convo is", conversation);
    res.json({ conversation });
  } catch {
    console.log("Error retrieving conversations:", err);
    res.sendStatus(500);
  }
};
module.exports = { getConversation };
