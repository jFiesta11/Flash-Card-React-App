const { flashcardFormatPrompt } = require("./context/prompt");

const MODEL_CHAIN = [
  "dots-studio/dots-3-note-preview:free",
  "inclusionai/ling-3.0-flash-fin:free",
  "nvidia/nemotron-3.5-lightning:free",
  "thinkingmachines/inkling-small:free",
  "poolside/laguna-s-2.1:free",
  "cohere/north-mini-code:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
];
const TIMEOUT_MS = 15000;

function isValidContent(data) {
  const content = data?.choices?.[0]?.message?.content;
  return typeof content === "string" && content.trim().length > 0;
}

async function callBot(model, prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
      signal: controller.signal,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || `Provider error (${res.status})`);
    }
    if (!isValidContent(data)) {
      throw new Error("Invalid or empty response content");
    }
    return data.choices[0].message.content;
  } finally {
    clearTimeout(timeout);
  }
}

async function askBot(extractedText) {
  const prompt = flashcardFormatPrompt(extractedText);
  let lastError;

  for (const model of MODEL_CHAIN) {
    try {
      return await callBot(model, prompt);
    } catch (err) {
      lastError = err;
      console.error(`Model "${model}" failed ${err.message}`);
      continue;
    }
  }
  throw new Error(`All Models failed: ${lastError?.message}`);
}

module.exports = { askBot };
