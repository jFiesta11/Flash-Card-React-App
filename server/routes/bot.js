const express = require("express");
const multer = require("multer");
const { extractTextfromDoc } = require("../flashcard-bot/file-extractor");
const { askBot } = require("../flashcard-bot/open-router");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/chat", upload.single("file"), async (req, res) => {
  try {
    console.log("Received mimetype:", req.file.mimetype);
    const extractedText = await extractTextfromDoc(
      req.file.buffer,
      req.file.mimetype,
    );
    const rawRes = await askBot(extractedText);
    const cleanedRes = rawRes.replace(/```json|```/g, "").trim();

    let flashcards;
    try {
      flashcards = JSON.parse(cleanedRes);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Bot did not return a valid response", raw: rawRes });
    }
    res.json({ flashcards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bot response invalid" });
  }
});
module.exports = router;
