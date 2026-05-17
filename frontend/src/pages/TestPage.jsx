import React, { useState } from "react";
import { useParams } from "react-router-dom";
import tests from "../data/tests";

export default function TestPage() {
  const { subject, level, week, day } = useParams();

  // 🔥 GET QUESTIONS
  const questions =
    tests[subject]?.[level]?.[week]?.[day] || [];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // 📝 HANDLE ANSWERS
  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  // ✅ SUBMIT TEST
  const handleSubmit = () => {
    setSubmitted(true);
  };

  // 🔥 CALCULATE SCORE
  const score = questions.reduce((total, q, i) => {
    return answers[i] === q.answer ? total + 1 : total;
  }, 0);

  // 🧠 REMARKS
  let remarks = "Needs Improvement ❌";
  if (score >= 4) remarks = "Excellent 🔥";
  else if (score >= 2) remarks = "Good 👍";

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧪 Test</h1>

      {questions.length === 0 && (
        <p>No test available for this module.</p>
      )}

      {/* QUESTIONS */}
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p>
            <strong>Q{i + 1}:</strong> {q.question}
          </p>

          {q.options.map((opt, j) => {
            const isCorrect = opt === q.answer;
            const isSelected = answers[i] === opt;

            return (
              <div key={j}>
                <input
                  type="radio"
                  name={`q${i}`}
                  disabled={submitted}
                  onChange={() => handleChange(i, opt)}
                />

                {/* 🔥 SHOW COLORS AFTER SUBMIT */}
                <span
                  style={{
                    color: submitted
                      ? isCorrect
                        ? "green"
                        : isSelected
                        ? "red"
                        : "black"
                      : "black",
                    fontWeight: submitted && isCorrect ? "bold" : "normal"
                  }}
                >
                  {opt}
                </span>
              </div>
            );
          })}
        </div>
      ))}

      {/* SUBMIT */}
      {!submitted && questions.length > 0 && (
        <button onClick={handleSubmit}>
          Submit Test
        </button>
      )}

      {/* RESULT */}
      {submitted && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result</h2>
          <p>
            Score: {score} / {questions.length}
          </p>
          <p>Remarks: {remarks}</p>
        </div>
      )}
    </div>
  );
  console.log(subject, level, week, day);
}