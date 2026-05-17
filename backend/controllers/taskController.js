import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {

    const task = new Task({
      title: req.body.title,
      subject: req.body.subject,
      duration: req.body.duration,
      dueDate: req.body.dueDate,
      reminder: req.body.reminder,
      preferredTime: req.body.preferredTime,
      userEmail: req.user.email
    });

    await task.save();

    res.json(task);

  } catch (err) {

    res.status(500).json(err);

  }
};