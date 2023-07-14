import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SendMessage from "./SendMessage";
import { socket } from "../../Socket/Socket";

export default function ChatPage({ contact }) {
  const [chat, setChatReceived] = useState([]);
  const [message, setMessageReceived] = useState([]);
  const scroll = useRef();

  const fetchConversation = async () => {
    if (contact) {
      const res = await axios.get(
        `http://localhost:5001/user/chatbox/${localStorage.getItem(
          "username"
        )}/${contact}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      //console.log("Res is", res.data[0].message);
      setChatReceived(res.data[0].message);
    }
  };

  const receiveMessage = (data) => {
    console.log("Yolo msg is", data);
    setMessageReceived((event) => [
      ...event,
      {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        createdTime: data.createdTime,
      },
    ]);
  };
  /* socket.on("receive_message", (data) => {
    console.log("Halleluah", data);
    return socket.off("receive_message");
  }); */

  useEffect(() => {
    socket.on("receive_message", receiveMessage);
    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("receive_message", receiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    fetchConversation();
  }, [contact]);

  return (
    <div className="chat-box">
      <div className="con-heading">
        <div className="con-img">
          <img src={require("../../assets/img-0.png")} />
        </div>
        <div className="con-name">{contact}</div>
      </div>
      <div className="prevMsg">
        {chat.map((msg, index) => {
          return (
            <>
              <div
                className={`chat-bubble ${
                  msg.sender === localStorage.getItem("username") ? "right" : ""
                }`}
                key={index}
              >
                <img
                  className="chat-bubble__left"
                  src={require("../../assets/img-0.png")}
                  alt="user avatar"
                />
                <div className="chat-bubble__right">
                  <p className="user-name">{msg.sender}</p>
                  <p className="user-message">{msg.message}</p>
                  <p className="message-time"> {msg.createdTime}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="msg">
        {message.map((msg, index) => {
          return (
            <>
              <div
                className={`chat-bubble ${
                  msg.sender === localStorage.getItem("username") ? "right" : ""
                }`}
                key={index}
              >
                <img
                  className="chat-bubble__left"
                  src={require("../../assets/img-0.png")}
                  alt="user avatar"
                />
                <div className="chat-bubble__right">
                  <p className="user-name">{msg.sender}</p>
                  <p className="user-message">{msg.message}</p>
                  <p className="message-time">{msg.createdTime}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div ref={scroll}></div>
      <SendMessage receiver={contact} scroll={scroll} />
    </div>
  );
}
