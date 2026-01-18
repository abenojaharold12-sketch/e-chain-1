import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create OpenAI client using your API key from Vercel
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        answer: "Please ask a question.",
      });
    }

    // Ask OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    // Send answer back to the website
    res.status(200).json({
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({
      answer: "Server error. Check Vercel logs.",
    });
  }
}
