import { useEffect, useState } from "react";

export default function Schedule() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // ✅ FILTER (WORKS FOR BOTH CREATED + DEADLINE)
  const filteredTasks = tasks.filter(task => {
    if (!selectedDate) return true;

    const created = task.createdAt
      ? new Date(task.createdAt).toISOString().split("T")[0]
      : null;

    const due = task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : null;

    return created === selectedDate || due === selectedDate;
  });

  const getEndTime = (start, duration = 60) => {
    if (!start) return "N/A";

    const [h, m] = start.split(":");
    let hour = parseInt(h);
    let minute = parseInt(m) + duration;

    hour += Math.floor(minute / 60);
    minute = minute % 60;

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📅 Timetable</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Created</th>
            <th>Deadline</th>
            <th>Task</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan="6">No tasks found</td>
            </tr>
          ) : (
            filteredTasks.map((task, index) => {
              const created = task.createdAt
                ? formatDate(task.createdAt)
                : "N/A";

              const deadline = task.dueDate
                ? formatDate(task.dueDate)
                : "No deadline";

              const start = task.preferredTime || "N/A";
              const end = getEndTime(start, task.duration);

              return (
                <tr key={index}>
                  <td>{created}</td>
                  <td>{deadline}</td>
                  <td>{task.title}</td>
                  <td>{start}</td>
                  <td>{end}</td>
                  <td>{task.duration || 60} min</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}