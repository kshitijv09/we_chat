import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
export default function Sidebar(props) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
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
    if (selectedContact === name) {
      setSelectedContact("");
    } else {
      setSelectedContact(name);
    }
    console.log("Name is", name);
    props.onConfirm(name);
  };

  return (
    <div className="sidebar">
      <div className="my-contact">
        <div className="contact-img">
          <img src={require("../../assets/img-1.png")} />
        </div>
        <div className="my-contact-name">
          <div> {username}</div>
        </div>
      </div>
      <div className="contact-list">
        {contacts.map((con) => {
          /* {
            console.log(con);
          } */
          return (
            <div
              key={con}
              className={`contact ${selectedContact === con ? "selected" : ""}`}
              onClick={() => sendContact(con)}
            >
              <div className="contact-img">
                <img src={require("../../assets/avatar-1.png")} />
              </div>
              <div className="contact-name">
                <div> {con}</div>
                <div id="status">Available</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-contacts">
        <Link to="/add-contact">
          <button>
            <span>Add Contacts +</span>
            <svg
              viewBox="-5 -5 110 110"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
