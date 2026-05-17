import axios from "axios";

// 🔥 CLEAN + EXTRACT JSON
function extractAndCleanJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  let clean = match[0];

  clean = clean
    .replace(/[\n\r]/g, "")
    .replace(/,\s*]/g, "]")
    .replace(/,\s*}/g, "}")
    .replace(/nerror/g, "")
    .replace(/undefined/g, "")
    .replace(/NaN/g, "")
    .replace(/\\'/g, "'");

  try {
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

// 🔥 VALIDATE QUESTIONS
function validateQuestions(data) {
  if (!data || !Array.isArray(data.questions)) return null;

  const valid = data.questions.filter(q =>
    q.question &&
    Array.isArray(q.options) &&
    q.options.length >= 2 &&
    q.answer
  );

  return valid.length ? { questions: valid } : null;
}

// 🔥 FALLBACK
function fallbackQuestions() {
  return {
    questions: [
      {
        type: "mcq",
        question: "What is Java?",
        options: ["Programming Language", "Animal", "Car", "OS"],
        answer: "Programming Language"
      },
      {
        type: "mcq",
        question: "Which is a data type?",
        options: ["int", "loop", "class", "function"],
        answer: "int"
      }
    ]
  };
}

// 🔥 GENERATE TEST
export async function generateTest(title, content) {
  const prompt = `
You are a strict JSON generator.

Create a test for "${title}"

Content:
${content}

RULES:
- Return ONLY JSON
- No explanation
- No comments
- Only "questions" array
- Each question must have:
  type, question, options (4), answer

FORMAT:
{
  "questions": [
    {
      "type": "mcq",
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}
`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "phi3",
      prompt,
      stream: false,
      options: { temperature: 0.2 }
    });

    const text = response.data.response;

    const parsed = extractAndCleanJSON(text);
    const valid = validateQuestions(parsed);

    if (valid) return valid;

    return fallbackQuestions();

  } catch {
    return fallbackQuestions();
  }
}

// 🔥 EVALUATE TEST
export async function evaluateTest(questions, answers) {
  const prompt = `
Evaluate answers:

Questions:
${JSON.stringify(questions)}

Answers:
${JSON.stringify(answers)}

Return ONLY JSON:

{
  "score": number,
  "feedback": "text"
}
`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "phi3",
      prompt,
      stream: false,
      options: { temperature: 0.2 }
    });

    const text = response.data.response;

    const parsed = extractAndCleanJSON(text);

    if (parsed) return parsed;

    return { score: 0, feedback: "Evaluation failed" };

  } catch {
    return { score: 0, feedback: "Error evaluating test" };
  }
}
