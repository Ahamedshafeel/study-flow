import express from "express";
import Topic from "../models/Topic.js";
import { generateTest, evaluateTest } from "../services/aiService.js";

const router = express.Router();


// ✅ ADD TOPIC (you use this to insert content)
router.post("/add", async (req, res) => {
  try {
    const { subject, topicId, title, content } = req.body;

    const topic = new Topic({
      subject,
      topicId,
      title,
      content
    });

    await topic.save();
    res.json(topic);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET LEARNING CONTENT
router.get("/:topicId", async (req, res) => {
  const topic = await Topic.findOne({ topicId: req.params.topicId });

  if (!topic) return res.status(404).json({ error: "Topic not found" });

  res.json(topic);
});


// 🔥 GET AI GENERATED TEST
router.get("/:topicId/test", async (req, res) => {
  const topic = await Topic.findOne({ topicId: req.params.topicId });

  if (!topic) return res.status(404).json({ error: "Topic not found" });

  const test = await generateTest(topic.title, topic.content);

  res.json(test);
});


// 🔥 SUBMIT TEST
router.post("/submit", async (req, res) => {
  const { questions, answers } = req.body;

  const result = await evaluateTest(questions, answers);

  res.json(result);
});
// 🔥 Get topics by subject
router.get("/subject/:subject", async (req, res) => {
  try {
    const topics = await Learning.find({ subject: req.params.subject });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;