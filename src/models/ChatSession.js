const mongoose = require("mongoose");

const chatSessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ChatSession", chatSessionSchema);
