import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { socket } from "../../Socket/Socket";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { useLocation } from "react-router-dom";

import "./style.css";

const ChatMsg = ({ msg, username }) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    socket.on("last_100_messages", (msg) => {
      console.log("Received from database is", msg); // Need to sort messages by Date here before displaying
      /*  setMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]); */
    });
  }, [socket]);

  return (
    <main className="chat-box">
      <div className="heading">
        <h1>CHAT BOX</h1>
      </div>
      <div className="msg">
        {msg.map((msg, i) => {
          {
            console.log("Msg is", msg);
          }
          return (
            <div key={i}>
              <h1> Hi,{msg.message}</h1>
            </div>
          );
        })}
      </div>
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} username={username} />
    </main>
  );
};

export default ChatMsg;
