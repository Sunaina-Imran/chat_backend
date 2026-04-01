const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function askAI(messages) {
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
  });

  return completion.choices[0].message.content;
}

module.exports = askAI;
