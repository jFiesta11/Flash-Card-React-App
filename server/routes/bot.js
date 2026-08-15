const express = require("express");
const { askBot } = require("../flashcard-bot/open-router");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const reply = await askBot(prompt);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
