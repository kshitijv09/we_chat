import React, { useEffect, useState } from "react";

import { socket } from "../../Socket/Socket";
import { useAuth } from "../../context/AuthContext";
import "./Chatbox.css";

export default function Chatbox() {
  const room = "Room 1";
  const [prevMsg, setPrevMsg] = useState([]);

  const username = localStorage.getItem("username");

  /*   const enableChatbox = () => {
    
  }; */

  useEffect(() => {
    /*  enableChatbox(); */
    socket.emit("join_room", { room, username });
  }, []);

  useEffect(() => {
    socket.on("last_100_messages", handleLast100Messages);

    return () => {
      socket.off("last_100_messages", handleLast100Messages);
    };
  }, []);

  const handleLast100Messages = (msg) => {
    console.log("Received from database:", msg);
    setPrevMsg(msg);
  };

  return <div className="chat-box"></div>;
}
