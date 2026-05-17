import { useEffect, useState } from "react";
import predefinedSubjects from "../data/predefinedSubjects";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOAD SUBJECTS
  const loadSubjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/subjects");
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error("Error loading subjects", err);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // ✅ CREATE SUBJECT
  const createSubject = async () => {
    if (!name.trim()) {
      alert("Enter subject name");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      setName("");
      loadSubjects();
    } catch (err) {
      console.error("Error creating subject", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD PREDEFINED SUBJECT
  const addPredefinedSubject = async (subjectName) => {
    try {
      await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: subjectName }),
      });

      loadSubjects();
    } catch (err) {
      console.error("Error adding predefined subject", err);
    }
  };

  // ✅ DELETE SUBJECT
  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/subjects/${id}`, {
        method: "DELETE",
      });

      loadSubjects();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>

      {/* Heading */}
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        📚 Subjects
      </h1>

      {/* Predefined Subjects */}
      <div style={{
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>Predefined Subjects</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {predefinedSubjects.map((sub, i) => (
            <button
              key={i}
              onClick={() => addPredefinedSubject(sub)}
              style={{
                background: "#e0e7ff",
                color: "#3730a3",
                border: "none",
                padding: "8px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              {sub.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Create Subject */}
      <div style={{
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>Create Your Own</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={createSubject}
            disabled={loading}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* Custom Subjects */}
      <div style={{
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>Custom Subjects</h2>

        {subjects.length === 0 ? (
          <p>No custom subjects yet.</p>
        ) : (
          <div>
            {subjects.map((s) => (
              <div
                key={s._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #eee"
                }}
              >
                <span>{s.name}</span>

                <button
                  onClick={() => deleteSubject(s._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}