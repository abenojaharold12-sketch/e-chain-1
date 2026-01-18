import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { question } = req.body;
  if (!question) return res.status(400).json({ answer: "No question provided." });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }]
    });

    const answer = completion.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Error contacting OpenAI API." });
  }
}
