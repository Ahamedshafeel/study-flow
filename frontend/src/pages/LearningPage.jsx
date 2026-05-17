import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import topics from "../data/topics";

export default function LearningPage() {
  const { subject, level, week, day } = useParams();
  const navigate = useNavigate();

  // 🔥 GET TOPIC DATA
  const topicData =
    topics[subject]?.[level]?.[week]?.[day];

  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`);
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setOutput("Error running code");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{subject} | {level} | {week} | {day}</h1>

      {/* 📘 TOPIC TITLE */}
      <h2>{topicData?.title || "No Topic Found"}</h2>

      {/* 📘 THEORY */}
      <h3>Theory</h3>
      <div style={{ background: "#f5f5f5", padding: "10px" }}>
        {topicData?.theory || "No theory available for this topic"}
      </div>

      {/* 🎥 VIDEO */}
      <h3>Video</h3>
      {topicData?.video ? (
        <iframe
          width="560"
          height="315"
          src={topicData.video}
          title="YouTube video"
          allowFullScreen
        />
      ) : (
        <p>No video available</p>
      )}

      {/* 💻 CODE PRACTICE */}
      <h2>Practice Code</h2>

      <select
        value={language}
        onChange={(e) => {
          const lang = e.target.value;
          setLanguage(lang);

          if (lang === "java") {
            setCode(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`);
          } else {
            setCode(`console.log("Hello World");`);
          }
        }}
      >
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
      </select>

      {/* 🧠 EDITOR */}
      <Editor
        height="350px"
        language={language === "java" ? "java" : "javascript"}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />

      {/* ▶ RUN */}
      <button onClick={runCode} style={{ marginTop: "10px" }}>
        ▶ Run Code
      </button>

      {/* 📤 OUTPUT */}
      <div
        style={{
          marginTop: "15px",
          background: "black",
          color: "lime",
          padding: "10px",
          minHeight: "100px",
        }}
      >
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>

      {/* 🧪 TEST */}
      <button
        onClick={() =>
          navigate(`/test/${subject}/${level}/${week}/${day}`)
        }
        style={{ marginTop: "20px" }}
      >
        Start Test
      </button>
    </div>
  );
}