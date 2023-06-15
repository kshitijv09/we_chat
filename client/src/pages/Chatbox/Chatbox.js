import React, { useEffect, useState } from "react";
import ChatMsg from "../../components/Comments Section/ChatMsg";
import { socket } from "../../Socket/Socket";
import { useAuth } from "../../context/AuthContext";

export default function Chatbox() {
  const [room, setRoom] = useState("Room 1");

  const [messagesRecieved, setMessagesReceived] = useState([]);
  const { user } = useAuth();
  const [username, setUsername] = useState(user);

  const enableChatbox = () => {
    socket.emit("join_room", { room, username });
  };
  useEffect(() => {
    enableChatbox();
  }, []);

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

    //Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div>
      {console.log("User is", messagesRecieved)}
      <ChatMsg msg={messagesRecieved} username={username} />
    </div>
  );
}
