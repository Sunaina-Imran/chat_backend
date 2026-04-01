const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSession",
    },

    role: {
      type: String,
    },

    content: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Message", messageSchema);
