import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get question safely
    const question = req.body?.question;
    if (!question) {
      return res.status(400).json({
        answer: "Please ask a question.",
      });
    }

    // Call OpenAI Responses API
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

    // Send back AI response
    return res.status(200).json({
      answer: response.output_text,
    });

  } catch (error) {
    console.error("AI API error:", error);

    // 🔔 Quota / rate limit error (your current issue)
    if (error?.code === "insufficient_quota" || error?.status === 429) {
      return res.status(200).json({
        answer: "⚠️ AI is temporarily unavailable due to usage limits. Please try again later.",
      });
    }

    // 🔔 Any other error
    return res.status(500).json({
      answer: "⚠️ AI service error. Please try again later.",
    });
  }
}
