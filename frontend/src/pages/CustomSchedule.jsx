import { useState } from "react";
import axios from "axios";

export default function CustomSchedule() {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState([]);

  const handleUpload = async () => {
    if (!file || !subject) {
      alert("Select file and subject");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("subject", subject);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/custom-schedule/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setTopics(res.data.topics);
      alert("✅ Schedule Created!");

    } catch (err) {
      console.error(err);
      alert("❌ Error processing PDF");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 Smart PDF Learning Planner</h2>

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        🚀 Generate Schedule
      </button>

      <h3>📚 Detected Topics:</h3>
      <ul>
        {topics.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}