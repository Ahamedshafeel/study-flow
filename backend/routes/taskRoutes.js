import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// ✅ CREATE TASK
router.post("/", async (req, res) => {
  try {
    const {
      title,
      topicId,
      type,
      preferredTime,
      reminderBefore,
      userEmail
    } = req.body;

    const newTask = new Task({
      title,
      topicId: topicId || null,
      type: type || "normal",
      preferredTime,
      reminderBefore,
      userEmail
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET ALL TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;