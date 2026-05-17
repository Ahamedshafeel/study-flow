import fs from "fs";
import {
  extractTopicsFromPDF,
  createTasksFromTopics
} from "./customScheduleService.js";

export const uploadPDFSchedule = async (req, res) => {
  try {
    const file = req.file;
    const { subject } = req.body;

    const userEmail = req.user.email;

    if (!file) {
      return res.status(400).json({
        message: "Upload a PDF file"
      });
    }

    // 🔍 Extract topics
    const topics = await extractTopicsFromPDF(file.path);

    if (!topics.length) {
      fs.unlinkSync(file.path);
      return res.status(400).json({
        message: "No topics found"
      });
    }

    // 📅 Create tasks
    const tasks = await createTasksFromTopics(
      topics,
      userEmail,
      subject
    );

    fs.unlinkSync(file.path);

    res.json({
      message: "✅ Schedule created successfully",
      topics,
      tasks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};
