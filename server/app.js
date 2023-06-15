const express = require("express");
const authRouter = require("./routes/Auth");
const chatRouter = require("./routes/Chat");
const authenticateUser = require("./middleware/authentication");

const app = express();
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 5000;

app.use("/auth", authRouter);
app.use("/user", authenticateUser, chatRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("Server is Spinning");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
