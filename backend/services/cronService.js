import cron from "node-cron";
import Task from "../models/Task.js";
import { sendEmail } from "./emailService.js";
import { getReminderTime } from "../utils/timeHelper.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const currentTime =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");

  const tasks = await Task.find();

  for (let task of tasks) {
    const reminderTime = getReminderTime(
      task.preferredTime,
      task.reminderBefore
    );

    if (currentTime === reminderTime) {
      let subject = "Study Reminder";
      let message = "";

      // 🔥 LEARNING TASK
      if (task.type === "learning" && task.topicId) {
        const link = `http://localhost:5173/learning/${task.topicId}`;

        message = `
Learn: ${task.title}

Click below to start learning:
${link}
        `;
      } else {
        // NORMAL TASK
        message = `Reminder: ${task.title}`;
      }

      await sendEmail(task.userEmail, subject, message);
    }
  }
});