import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../Socket/Socket";

/* import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5001"); */

export default function Login() {
  const room = "Room1";

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const { loginHandler, userHandler } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setUsername(emailRef.current.value);
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://chatapp-v13g.onrender.com/auth/login",
        userData
      );
      
      if (response.status === 200) {
        // Save the auth token and redirect
        loginHandler(true);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("username", userNameRef.current.value);
        userHandler(emailRef.current.value);
        /*  socket.emit("join_room", { msg: "Joining Chatbox" }); */
        //socket.emit("join_room", { room, username });
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Modal>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" ref={userNameRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{ marginTop: "1.2em" }}
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" style={{ color: "white" }}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Modal>
    </>
  );
}
