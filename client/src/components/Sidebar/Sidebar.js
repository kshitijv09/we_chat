import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
                <img src={require("../../assets/img-0.png")} />
              </div>
              <div
                className="contact-name"
                onClick={() => {
                  sendContact(con);
                }}
              >
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
