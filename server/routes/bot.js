const express = require("express");
const multer = require("multer");
const { extractTextfromDoc } = require("../flashcard-bot/file-extractor");
const { askBot } = require("../flashcard-bot/open-router");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/chat", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "A PDF or DOCX file is required" });
    }

    console.log("Received mimetype:", req.file.mimetype);
    const extractedText = await extractTextfromDoc(
      req.file.buffer,
      req.file.mimetype,
    );
    if (!extractedText.trim()) {
      return res
        .status(400)
        .json({ error: "The uploaded file contains no text" });
    }

    const rawRes = await askBot(extractedText);
    const cleanedRes = rawRes.replace(/```json|```/g, "").trim();

    let flashcards;
    try {
      flashcards = JSON.parse(cleanedRes);
    } catch {
      return res
        .status(500)
        .json({ error: "Bot did not return a valid response", raw: rawRes });
    }
    res.json({ flashcards });
  } catch (error) {
    console.error(error);
    res
      .status(502)
      .json({ error: error.message || "AI service request failed" });
  }
});
module.exports = router;
