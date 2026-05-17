import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AIChat() {
  const { subject } = useParams();

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          question,
        }),
      });

      const data = await res.json();
      setResponse(data.response);

    } catch (err) {
      setResponse("Error getting response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🤖 Ask AI about {subject}</h1>

      <textarea
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={askAI}>
        Ask
      </button>

      {loading && <p>Thinking...</p>}

      {response && (
        <div style={{
          marginTop: "20px",
          background: "#f5f5f5",
          padding: "10px"
        }}>
          <strong>Answer:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
