export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found!");
    return res.status(500).json({ error: "Server missing API key" });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
