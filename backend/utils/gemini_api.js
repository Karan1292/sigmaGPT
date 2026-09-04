import "dotenv/config";

const getAPIResponse = async (message) => {
  if (!message) {
    throw new Error("message is required");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{
            text: `You are a concise coding assistant.
Rules:
- Give ONE clear answer, not multiple language versions unless asked
- Keep explanations short and to the point
- Use simple formatting: short paragraphs, minimal headers
- Use bold text for important words.
- Use bullet points when listing things.
// - Only include code when necessary, in one language (default to JavaScript unless the user specifies otherwise)
- No long "how it works" essays unless the user asks for a detailed explanation`
          }]
        },
        contents: [{ role: "user", parts: [{ text: message }] }],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data.error?.message || "API error");
  }

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  return reply;
};

export default getAPIResponse;