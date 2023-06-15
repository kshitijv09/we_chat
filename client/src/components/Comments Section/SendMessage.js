import React, { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import "./style.css";
import { socket } from "../../Socket/Socket";

const SendMessage = ({ scroll, username }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const [room, setRoom] = useState("Room 1");
  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  /* const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }; */
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
