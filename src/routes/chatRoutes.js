const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// create new chat session
router.post("/session", chatController.createSession);

// get all chats
router.get("/sessions", chatController.getSessions);

// get messages
router.get("/messages/:sessionId", chatController.getMessages);

// send message
router.post("/message", chatController.sendMessage);

// delete session
router.delete("/session/:sessionId", chatController.deleteSession);

module.exports = router;
