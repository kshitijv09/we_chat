import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";
export default function Sidebar(props) {
  const [contacts, setContacts] = useState([]);
  const username = localStorage.getItem("username");

  const fetchContacts = async (props) => {
    // console.log("Usernae=me is", username);
    const response = await axios.get(
      `http://localhost:5001/user/chatbox/${username}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    //console.log("Response is", response.data);
    setContacts(response.data.contacts);
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const sendContact = (name) => {
    console.log("Name is", name);
    props.onConfirm(name);
  };

  return (
    <div className="sidebar">
      <h1> This is the Sidebar</h1>
      <div className="contact-list">
        {contacts.map((con) => {
          {
            console.log(con);
          }
          return (
            <div className="contact">
              <div className="contact-img">
                <img src="./" />
              </div>
              <div
                className="contact-name"
                onClick={() => {
                  sendContact(con);
                }}
              >
                {con}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
