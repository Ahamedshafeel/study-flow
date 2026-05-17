import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import predefinedSubjects from "../data/predefinedSubjects";
export default function LearningLevels() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const levels = ["basics", "intermediate", "advanced", "practice"];
  
  const isPredefined = predefinedSubjects.includes(subject);

if (!isPredefined) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{subject}</h1>
      <p>This is a custom subject.</p>
      <p>You can learn this on your own.</p>
    </div>
  );
}
  return (
    <div style={{ padding: "20px" }}>
      <h1>{subject.toUpperCase()} - Levels</h1>

      {levels.map((level) => (
        <button
          key={level}
          onClick={() => navigate(`/learning/${subject}/${level}`)}
          style={{ display: "block", margin: "10px", padding: "10px" }}
        >
          {level.toUpperCase()}
        </button>
      ))}
    </div>
  );
}