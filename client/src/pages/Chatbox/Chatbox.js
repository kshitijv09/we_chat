import React, { useEffect, useState } from "react";
import ChatMsg from "../../components/Comments Section/ChatMsg";
import { socket } from "../../Socket/Socket";
import { useAuth } from "../../context/AuthContext";

export default function Chatbox() {
  const room = "Room 1";
  const [prevMsg, setPrevMsg] = useState([]);
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [newUser, enterNewUser] = useState();

  const username = localStorage.getItem("username");

  const enableChatbox = () => {
    socket.emit("join_room", { room, username });
  };
  useEffect(() => {
    enableChatbox();
  }, []);

  useEffect(() => {
    socket.on("last_100_messages", (msg) => {
      console.log("Received from database is", msg);
      setPrevMsg(msg);

      // Need to sort messages by Date here before displaying
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

  /* useEffect(() => {
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
  }, [socket]); */

  return (
    <div>
      {/* {console.log("Messi is", prevMsg)} */}
      {/* {prevMsg.map((msg) => {
        return (
          <>
            <p> {msg.message}</p>
            <p> {msg.username}</p>
          </>
        );
      })} */}
      <ChatMsg prevMsg={prevMsg} username={username} />
    </div>
  );
}
