const { flashcardFormatPrompt } = require("./context/prompt");

async function askBot(extractedText) {
  const prompt = flashcardFormatPrompt(extractedText);
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-4-26b-a4b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

module.exports = { askBot };
