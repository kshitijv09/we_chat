const express = require("express");
const authRouter = require("./routes/Auth");
const chatRouter = require("./routes/Chat");
const authenticateUser = require("./middleware/authentication");
const cors = require("cors");
const http = require("http");
const app = express();
const socketIO = require("socket.io");
const { Server } = require("socket.io");

const getMessages = require("./controllers/conversationController");

const Message = require("./models/Message");

require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", authenticateUser, chatRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "Chatbot";
let allUsers = [];
let chatRoomUsers = [];

// Add this
// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  // ...
  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    console.log(username, room);
    socket.join(room); // Join the user to a socket room

    // Add this
    let __createdtime__ = Date.now(); // Current timestamp

    /* const msgs = getMessages();
    console.log("Data from database is", msgs); */

    async function fetchMessages() {
      try {
        const prevMessages = await getMessages();
        /* console.log(prevMessages); */
        socket.emit("last_100_messages", prevMessages);
        // Process or display the fetched messages as needed
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }

    // Invoke the function
    fetchMessages();

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    //
    socket.to(room).emit("receive_message", {
      // Send message to all users currently in the room, apart from the user that just joined
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
  // Add this
  // Save the new user to the room
  socket.on("send_message", (data) => {
    const { message, username, room, createdtime } = data;
    console.log("On send message", data);
    const newMessage = new Message({
      username,
      message,
      createdtime,
    });

    // Save the message to the database
    newMessage
      .save()
      .then(() => {
        // Emit the message to all connected clients, including the sender
        console.log("New Message is", newMessage);
      })
      .catch((error) => {
        console.error("Error saving message:", error);
      });
    io.in(room).emit("receive_chat", data);
    // Send to all users in room, including sender
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log("Server is Spinning");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
