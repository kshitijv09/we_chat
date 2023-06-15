const Message = require("../models/Message");

const getMessages = async () => {
  const data = await Message.find({});
  return data;
};

module.exports = getMessages;
