require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

app.use("/api", chatRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
