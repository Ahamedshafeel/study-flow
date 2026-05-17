// ✅ LOAD ENV FIRST (VERY IMPORTANT)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ✅ ROUTES
import taskRoutes from "./routes/taskRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
// ✅ START CRON (AFTER ENV LOADED)
import "./services/cronService.js";
import aiRoutes from "./routes/aiRoutes.js";
import customScheduleRoutes from "./modules/customSchedule/customScheduleRoutes.js";

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/api", codeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/custom-schedule", customScheduleRoutes);
// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/learning", learningRoutes);

// ✅ DATABASE CONNECTION (FROM ENV)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch(err => {
    console.log("❌ MongoDB Error:", err);
  });

// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ DEBUG (ONLY SAFE VALUES)
console.log("📧 EMAIL USER:", process.env.EMAIL_USER);
console.log("🤖 OPENAI KEY:", process.env.OPENAI_API_KEY<REMOVED>
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY<REMOVED>
