import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatPage({ contact }) {
  const [chat, setChatReceived] = useState([]);

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
      console.log("Res is", res.data[0].message);
      setChatReceived(res.data.message);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [contact]);
  return <div> contact value is {contact}</div>;
}
