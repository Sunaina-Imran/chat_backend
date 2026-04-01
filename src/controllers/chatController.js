const ChatSession = require("../models/ChatSession");
const Message = require("../models/Message");
const askAI = require("../services/aiService");

exports.createSession = async (req, res) => {
  try {
    const session = await ChatSession.create({});
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await ChatSession.find().sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      sessionId: req.params.sessionId,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    await Message.create({
      sessionId,
      role: "user",
      content: message,
    });

    const history = await Message.find({ sessionId }).sort({ createdAt: 1 });

    const messages = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const reply = await askAI(messages);

    await Message.create({
      sessionId,
      role: "assistant",
      content: reply,
    });

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Delete the session explicitly
    const sessionDeleted = await ChatSession.findByIdAndDelete(sessionId);

    if (!sessionDeleted) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Delete all messages associated with the session
    await Message.deleteMany({ sessionId });

    res.json({ message: "Session and associated messages deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
