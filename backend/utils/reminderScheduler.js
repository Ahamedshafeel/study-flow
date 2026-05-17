const cron = require('node-cron');
const Task = require('./models/task');
const sendEmail = require('./sendEmail');

const startReminderScheduler = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Checking reminders...');

    const now = new Date();

    const tasks = await Task.find({
      reminderMinutesBefore: { $gt: 0 },
      completed: false,
    }).populate('user');

    for (let task of tasks) {
      const reminderTime = new Date(task.dueDate);
      reminderTime.setMinutes(reminderTime.getMinutes() - task.reminderMinutesBefore);

      const reminderWindow = 2 * 60 * 1000; // 2 min window

      if (
        now >= reminderTime &&
        now < new Date(reminderTime.getTime() + reminderWindow) &&
        !task.reminderSent
      ) {
        console.log(`Sending reminder for task: ${task.title} to ${task.user.email}`);
        await sendEmail(
          task.user.email,
          `Reminder: ${task.title}`,
          `Your task "${task.title}" is due at ${task.dueDate}`
        );

        // Mark task as reminded
        task.reminderSent = true;
        await task.save();
      }
    }
  });
};

module.exports = startReminderScheduler;
