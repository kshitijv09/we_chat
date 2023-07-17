import { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Modal2 from "../../UI/Modal2/Modal2";

export default function AddContact() {
  const usernameRef = useRef();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sender = localStorage.getItem("username");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contact = usernameRef.current.value;
    await axios.post(
      `http://localhost:5001/user/chatbox/${sender}/${contact}`,
      { sender: sender, receiver: contact },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    navigate("/dashboard");
  };
  /*  useEffect(() => {
    
    console.log("Contact value changed:", contact);
  }, [contact]); */

  return (
    <>
      <Modal2>
        <Card style={{ width: "450px" }}>
          <Card.Body>
            <h2 className="som">Add Contact</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>Enter Contact Name</Form.Label>
                <Form.Control type="name" ref={usernameRef} required />
              </Form.Group>
              <div style={{ marginTop: "1.2em" }}>
                <Button
                  className="w-100"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Add Contact
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Modal2>
    </>
  );
}
