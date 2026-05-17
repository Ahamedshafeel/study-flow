import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LearningTopics() {
  const { subject } = useParams();
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/learning/subject/${subject}`)
      .then(res => res.json())
      .then(data => setTopics(data));
  }, [subject]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Learn {subject}</h1>

      {topics.map((t, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <button onClick={() => navigate(`/learning/topic/${t.topicId}`)}>
            {t.title}
          </button>
        </div>
      ))}
    </div>
  );
}