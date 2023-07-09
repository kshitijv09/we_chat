import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatPage from "../../components/ChatPage/ChatPage";

export default function Dashboard(props) {
  const [contactName, setContactName] = useState("");

  const contactHandler = (name) => {
    console.log("Name 2 is", name);
    setContactName(name);
  };
  return (
    <div>
      <Sidebar onConfirm={contactHandler} />
      <ChatPage contact={contactName} />
    </div>
  );
}
