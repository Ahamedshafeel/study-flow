import cron from "node-cron";
import Task from "../models/Task.js";
import { sendReminderEmail } from "./emailService.js";

const getReminderTime = (preferredTime, reminderMinutes) => {

  const [hour, minute] = preferredTime.split(":").map(Number);

  let totalMinutes = hour * 60 + minute - reminderMinutes;

  let h = Math.floor(totalMinutes / 60);
  let m = totalMinutes % 60;

  return `${h}:${m}`;
};

export const startReminderService = () => {

  cron.schedule("* * * * *", async () => {

    const now = new Date();

    const currentTime =
      now.getHours() + ":" + now.getMinutes();

    const tasks = await Task.find({ reminderSent: false });

    for (const task of tasks) {

      const reminderTime =
        getReminderTime(task.preferredTime, task.reminder);

      if (reminderTime === currentTime) {

        await sendReminderEmail(task.userEmail, task);

        task.reminderSent = true;

        await task.save();

      }

    }

  });

};