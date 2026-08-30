const { flashcardFormatPrompt } = require("./context/prompt");

const MODEL_CHAIN = [
  "thinkingmachines/inkling-small:free",
  "inclusionai/ling-3.0-flash-fin:free",
  "nvidia/nemotron-3.5-lightning:free",
  "cohere/north-mini-code:free",
  "poolside/laguna-s-2.1:free",
  "google/gemma-4-26b-a4b-it:free",
];
const TIMEOUT_MS = 12000;
const MODEL_BATCH_SIZE = 2;
const MAX_MODEL_ATTEMPTS = 3;

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
  const errors = [];

  for (
    let index = 0;
    index < Math.min(MODEL_CHAIN.length, MAX_MODEL_ATTEMPTS);
    index += MODEL_BATCH_SIZE
  ) {
    const batch = MODEL_CHAIN.slice(index, index + MODEL_BATCH_SIZE);

    try {
      const result = await Promise.any(
        batch.map(async (model) => {
          try {
            return await callBot(model, prompt);
          } catch (error) {
            console.error(`Model "${model}" failed: ${error.message}`);
            throw error;
          }
        }),
      );

      return result;
    } catch (batchError) {
      const batchFailures =
        batchError instanceof AggregateError ? batchError.errors : [batchError];
      errors.push(...batchFailures);
    }
  }

  const lastError = errors.at(-1);
  throw new Error(
    `All Models failed: ${lastError?.message || "Unknown error"}`,
  );
}

module.exports = { askBot };
