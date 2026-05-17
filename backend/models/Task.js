import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    topicId: {
      type: String,
      default: null
    },

    type: {
      type: String,
      enum: ["normal", "learning"],
      default: "normal"
    },

    subject: {
      type: String
    },

    duration: {
      type: Number,
      default: 60
    },

    // ✅ DEADLINE
    dueDate: {
      type: Date
    },

    preferredTime: {
      type: String,
      required: true
    },

    reminderBefore: {
      type: Number,
      default: 0
    },

    userEmail: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // ✅ adds createdAt
  }
);

export default mongoose.model("Task", taskSchema);