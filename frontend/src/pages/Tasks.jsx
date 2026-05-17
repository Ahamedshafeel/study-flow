import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Tasks() {
  const [task, setTask] = useState({
    title: "",
    subject: "",
    duration: 60,
    dueDate: "",
    reminder: 0,
    preferredTime: ""
  });

  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadSubjects();
    loadTasks();
  }, []);

  const loadSubjects = async () => {
    const res = await axios.get("http://localhost:5000/api/subjects");
    setSubjects(res.data);
  };

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const createTask = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const newTask = {
      ...task,
      reminderBefore: task.reminder,
      userEmail: user?.email
    };

    await axios.post("http://localhost:5000/api/tasks", newTask);

    setTask({
      title: "",
      subject: "",
      duration: 60,
      dueDate: "",
      reminder: 0,
      preferredTime: ""
    });

    loadTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="card">
      <h2>New Task</h2>

      <label>Title</label>
      <input name="title" value={task.title} onChange={handleChange} />

      <label>Subject</label>
      <select name="subject" value={task.subject} onChange={handleChange}>
        <option value="">Select subject</option>
        {subjects.map((sub) => (
          <option key={sub._id} value={sub.name}>
            {sub.name}
          </option>
        ))}
      </select>

      <label>Duration (minutes)</label>
      <input
        type="number"
        name="duration"
        value={task.duration}
        onChange={handleChange}
      />

      <label>Due Date (Deadline)</label>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />

      <label>Reminder (minutes before)</label>
      <input
        type="number"
        name="reminder"
        value={task.reminder}
        onChange={handleChange}
      />

      <label>Time Preference</label>
      <input
        type="time"
        name="preferredTime"
        value={task.preferredTime}
        onChange={handleChange}
      />

      <button onClick={createTask}>Create Task</button>

      <h3>Existing Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((t) => (
          <div key={t._id} className="schedule-row">
            <div><b>{t.title}</b></div>
            <div>{t.subject}</div>
            <div>{t.preferredTime}</div>

            <button
              onClick={() => deleteTask(t._id)}
              style={{ background: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}