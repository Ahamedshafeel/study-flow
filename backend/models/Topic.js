import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  subject: String,
  topicId: String,   // "data-types"
  title: String,
  content: String    // your learning content (HTML/text)
});

export default mongoose.model("Topic", topicSchema);