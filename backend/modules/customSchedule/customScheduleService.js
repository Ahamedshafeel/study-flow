import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Task from "../../models/Task.js";

/* 🔍 Extract Topics */
export const extractTopicsFromPDF = async (filePath) => {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let textContent = "";

    const maxPages = Math.min(2, pdf.numPages);

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      content.items.forEach(item => {
        textContent += item.str + "\n";
      });
    }

    const lines = textContent.split("\n");

    let topics = [];

    lines.forEach(line => {
      line = line.trim();

      if (/^\d+[\.\)]\s/.test(line)) {
        topics.push(line.replace(/^\d+[\.\)]\s/, "").trim());
      } 
      else if (/chapter\s+\d+/i.test(line)) {
        topics.push(line);
      }
    });

    return [...new Set(topics)].filter(t => t.length > 2);

  } catch (err) {
    console.error("PDF Parsing Error:", err);
    return [];
  }
};


/* 📅 Create Tasks (DAY + TIME BASED LOGIC) */
export const createTasksFromTopics = async (
  topics,
  userEmail,
  subject
) => {
  try {
    const tasks = topics.map((topic, index) => {

      // ⏰ Time logic (HH:mm format)
      const hour = 9 + (index % 3) * 2; // 9AM, 11AM, 1PM
      const preferredTime = `${hour.toString().padStart(2, "0")}:00`;

      return {
        title: `${subject} - ${topic}`,
        topicId: null,
        type: "learning",          // ✅ valid enum
        preferredTime,             // ✅ HH:mm
        reminderBefore: 30,        // ✅ correct field
        userEmail                 // ✅ required
      };
    });

    return await Task.insertMany(tasks);

  } catch (err) {
    console.error("Task Creation Error:", err);
    return [];
  }
};