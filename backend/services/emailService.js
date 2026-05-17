import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahamedshafeel6@gmail.com",
    pass: "gubfudlxwqhwqwln"
  }
});

export const sendEmail = async (to, task) => {
  try {
    let message = "";

    // 🔥 CHECK IF LEARNING TASK
    if (task.type === "learning" && task.topicId) {
      const link = `http://localhost:5173/learning/${task.topicId}`;

      message = `
📘 Study Reminder

Topic: ${task.title}
Time: ${task.preferredTime}

Start Learning:
${link}
      `;
    } else {
      // NORMAL TASK
      message = `
Reminder!

Task: ${task.title}
Subject: ${task.subject || "N/A"}
Time: ${task.preferredTime}

Start now!
      `;
    }

    await transporter.sendMail({
      from: `"Study Flow" <ahamedshafeel6@gmail.com>`,
      to: to,
      subject: "Study Reminder",
      text: message
    });

    console.log("Email sent to:", to);

  } catch (err) {
    console.log("Email error:", err);
  }
};