import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { socket } from "../../Socket/Socket";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { useLocation } from "react-router-dom";

import "./style.css";

const ChatMsg = ({ prevMsg, username }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMessagesReceived] = useState({});
  const [chat, setChatReceived] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received msg is", data);
      setMessagesReceived(data);
    });

    return () => socket.off("receive_message");
  }, []);

  useEffect(() => {
    socket.on("receive_chat", (data) => {
      console.log("Received chat is", data);

      setChatReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdtime: data.createdtime,
        },
      ]);
    });

    return () => socket.off("receive_chat");
  }, []);

  return (
    <main className="chat-box">
      <div className="heading">
        <h1>WE CHAT</h1>
      </div>
      <div className="prevMsg">
        {prevMsg.map((msg, index) => {
          return (
            <>
              <div
                className={`chat-bubble ${
                  msg.username === localStorage.getItem("username")
                    ? "right"
                    : ""
                }`}
                key={index}
              >
                {/* <img
        className="chat-bubble__left"
        src={msg.avatar}
        alt="user avatar"
      /> */}
                <div className="chat-bubble__right">
                  <p className="user-name">{msg.username}</p>
                  <p className="user-message">{msg.message}</p>
                  <p className="message-time"> {msg.createdtime}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="msg">
        <div className="welcome">
          <h1>{msg.message}</h1>{" "}
        </div>
        {console.log("ON consoling", chat)}
        {chat.map((msg, index) => {
          return (
            <>
              <div
                className={`chat-bubble ${
                  msg.username === localStorage.getItem("username")
                    ? "right"
                    : ""
                }`}
                key={index}
              >
                {/* <img
        className="chat-bubble__left"
        src={msg.avatar}
        alt="user avatar"
      /> */}
                <div className="chat-bubble__right">
                  <p className="user-name">{msg.username}</p>
                  <p className="user-message">{msg.message}</p>
                  <p className="message-time">{msg.createdtime}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div> */}
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <div ref={scroll}></div>
      <SendMessage scroll={scroll} username={username} />
    </main>
  );
};

export default ChatMsg;
