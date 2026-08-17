function flashcardFormatPrompt(extractedText) {
  return `You are a flashcard generator. Read the study material below and extract key concepts as flashcards.

Rules:
- Respond with ONLY valid JSON, no explanations, no markdown code fences, no extra text before or after.
- Use this exact structure: {"questions": [{"question": "...", "answer": "..."}]}
- Generate a minimum of 5 and a maximum of 50 flashcards, STRICTLY depending on how much content is in the material.
- Questions should test understanding, not just ask "what is X" for every term — mix definition, application, and comparison questions where possible.
- Keep answers concise (1-3 words).
- Keep questions concise (1-3 sentences).
- Do not invent facts that aren't in the source material.

Study material:
"""
${extractedText}
"""`;
}

module.exports = { flashcardFormatPrompt };
