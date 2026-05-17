import express from "express";

const router = express.Router();

// ✅ GENERATE MCQ QUESTIONS ONLY
router.post("/generate", async (req, res) => {
  const { subject, level, topic } = req.body;

  const prompt = `
Generate 5 multiple choice questions for:

Subject: ${subject}
Level: ${level}
Topic: ${topic}

Rules:
- Only MCQ questions
- Each question must have exactly 4 options
- Provide correct answer from options
- Keep it simple

Return ONLY JSON:
[
  {
    "question": "What is Java?",
    "options": ["A language", "A car", "A fruit", "None"],
    "answer": "A language"
  }
]
`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tinyllama",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    // 🔥 CLEAN RESPONSE (IMPORTANT)
    let output = data.response || "[]";

    // remove unwanted text if any
    const match = output.match(/\[.*\]/s);
    if (match) {
      output = match[0];
    }

    res.json({ data: output });

  } catch (error) {
    console.error("Ollama API error:", error);

    // 🔥 FALLBACK QUESTIONS (VERY IMPORTANT)
    res.json({
      data: JSON.stringify([
        {
          question: "What is Java?",
          options: ["Language", "Car", "Fruit", "None"],
          answer: "Language",
        },
        {
          question: "Which is a loop?",
          options: ["for", "if", "int", "var"],
          answer: "for",
        },
        {
          question: "Java is ____ language",
          options: ["Object-oriented", "Markup", "Styling", "None"],
          answer: "Object-oriented",
        },
        {
          question: "Which keyword is used for class?",
          options: ["class", "def", "function", "var"],
          answer: "class",
        },
        {
          question: "Which is correct print statement?",
          options: [
            "System.out.println()",
            "print()",
            "echo()",
            "console.log()",
          ],
          answer: "System.out.println()",
        },
      ]),
    });
  }
});
// ✅ AI CHAT
router.post("/chat", async (req, res) => {
  const { subject, question } = req.body;

  const prompt = `
You are a helpful tutor for ${subject}.

Answer this question clearly:

${question}
`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tinyllama",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    res.json({ response: data.response });

  } catch (err) {
    console.error(err);
    res.json({ response: "Error from AI" });
  }
});

export default router;
