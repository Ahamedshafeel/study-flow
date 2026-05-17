import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LearningWeeks() {
  const { subject, level } = useParams();
  const navigate = useNavigate();

  const weeks = [1, 2, 3, 4];

  return (
    <div style={{ padding: "20px" }}>
      <h1>{level.toUpperCase()} - Plan</h1>

      {weeks.map((week) => (
        <button
          key={week}
          onClick={() => navigate(`/learning/${subject}/${level}/week${week}`)}
          style={{ display: "block", margin: "10px", padding: "10px" }}
        >
          Week {week}
        </button>
      ))}
    </div>
  );
}