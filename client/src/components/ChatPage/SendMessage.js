import React, { useState } from "react";
import axios from "axios";

import "./ChatPage.css";
import { socket } from "../../Socket/Socket";

const SendMessage = ({ receiver, scroll }) => {
  const sender = localStorage.getItem("username");

  const [message, setMessage] = useState("");

  const enterData = async (messageData) => {
    await axios.post(
      `http://localhost:5001/user/chatbox/${sender}/${receiver}`,
      messageData,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    await axios.post(
      `http://localhost:5001/user/chatbox/${receiver}/${sender}`,
      messageData,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const date = new Date();
    const createdTime = `${date.getHours()}:${date.getMinutes()}`;
    console.log("time is", createdTime);
    const messageData = {
      sender,
      receiver,
      message,
      createdTime,
    };
    enterData(messageData);
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    socket.emit("send_message", { sender, receiver, message, createdTime });

    setMessage("");
    //scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
