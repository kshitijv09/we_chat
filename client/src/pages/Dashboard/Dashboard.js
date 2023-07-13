import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatPage from "../../components/ChatPage/ChatPage";
import { socket } from "../../Socket/Socket";

export default function Dashboard(props) {
  const [contactName, setContactName] = useState("");

  const username = localStorage.getItem("username");

  const contactHandler = (name) => {
    console.log("Name 2 is", name);
    socket.emit("user_joined", { username });
    setContactName(name);
  };
  return (
    <div className="dashboard">
      <Sidebar onConfirm={contactHandler} />
      <ChatPage contact={contactName} />
    </div>
  );
}
