import React, { useEffect, useState } from "react";
import ChatMsg from "../../components/Comments Section/ChatMsg";
import { socket } from "../../Socket/Socket";
import { useAuth } from "../../context/AuthContext";

export default function Chatbox() {
  const room = "Room 1";
  const [prevMsg, setPrevMsg] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const enableChatbox = () => {
      socket.emit("join_room", { room, username });
    };

    socket.on("last_100_messages", handleLast100Messages);

    return () => {
      socket.off("last_100_messages", handleLast100Messages);
    };
  }, []); // Run only once when the component mounts

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const enableChatbox = () => {
      if (username) {
        socket.emit("join_room", { room, username });
      }
    };

    enableChatbox();
  }, [username]); // Run when the username changes

  const handleLast100Messages = (msg) => {
    console.log("Received from database:", msg);
    setPrevMsg(msg);
  };

  return (
    <div>
      <ChatMsg prevMsg={prevMsg} username={username} />
    </div>
  );
}
