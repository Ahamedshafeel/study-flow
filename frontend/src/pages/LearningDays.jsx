import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LearningDays() {
  const { subject, level, week } = useParams();
  const navigate = useNavigate();

  const days = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{week.toUpperCase()} - Days</h1>

      {days.map((day) => (
        <button
          key={day}
          onClick={() =>
            navigate(`/learning/${subject}/${level}/${week}/day${day}`)
          }
          style={{ display: "block", margin: "10px", padding: "10px" }}
        >
          Day {day}
        </button>
      ))}
    </div>
  );
}