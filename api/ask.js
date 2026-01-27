import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Safety: ensure body exists
    const question = req.body?.question;
    if (!question) {
      return res.status(400).json({ answer: "Please ask a question." });
    }

    // Call OpenAI Responses API (latest method)
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: "You are E-Chain AI, a helpful assistant for students."
        },
        {
          role: "user",
          content: question
        }
      ],
    });

    // Send the AI's answer
    res.status(200).json({ answer: response.output_text });

  } catch (error) {
    console.error("AI API error:", error);
    res.status(500).json({ answer: "Server error. Check Vercel logs." });
  }
}
