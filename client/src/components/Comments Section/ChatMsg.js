import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { socket } from "../../Socket/Socket";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { useLocation } from "react-router-dom";

import "./style.css";

const ChatMsg = ({ prevMsg, username }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMessagesReceived] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received msg is", data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <main className="chat-box">
      <div className="heading">
        <h1>CHAT BOX</h1>
      </div>
      <div className="prevMsg">
        {prevMsg.map((msg) => {
          return (
            <>
              <h2> {msg.message}</h2>
              <h3> {msg.username}</h3>
            </>
          );
        })}
      </div>
      <div className="msg">
        {msg.map((msg, i) => {
          return (
            <div key={i}>
              <h1>
                Hi,{msg.message},{msg.username},{msg._createdtime_}
              </h1>
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
