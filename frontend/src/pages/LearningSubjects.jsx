import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import predefinedSubjects from "../data/predefinedSubjects";

export default function LearningSubjects() {
  const [customSubjects, setCustomSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/subjects")
      .then(res => res.json())
      .then(data => setCustomSubjects(data));
  }, []);

  // 🔥 HANDLE CLICK (IMPORTANT)
  const handleSubjectClick = (sub) => {
    const name = sub.name ? sub.name.toLowerCase() : sub.toLowerCase();

    if (predefinedSubjects.includes(name)) {
      // ✅ NORMAL LEARNING
      navigate(`/learning/${name}`);
    } else {
      // 🤖 AI CHAT
      navigate(`/ai/${name}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Learning</h1>

      {/* 🔥 PREDEFINED */}
      <h2>Start Learning</h2>
      {predefinedSubjects.map((sub, i) => (
        <button
          key={i}
          onClick={() => handleSubjectClick(sub)}
          style={{
            margin: "5px",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          Learn {sub}
        </button>
      ))}

      {/* 🔥 CUSTOM */}
      <h2 style={{ marginTop: "20px" }}>Custom Subjects</h2>

      {customSubjects.length === 0 ? (
        <p>No custom subjects</p>
      ) : (
        customSubjects.map((sub) => (
          <button
            key={sub._id}
            onClick={() => handleSubjectClick(sub)}
            style={{
              margin: "5px",
              padding: "10px",
              background: "#eee",
              cursor: "pointer"
            }}
          >
            Learn {sub.name}
          </button>
        ))
      )}
    </div>
  );
}