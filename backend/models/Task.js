import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    list: [
      {
        text: { type: String },
        completed: { type: Boolean, default: false },
      },
    ],
    deadline: {
      type: Date,
      required: true,
    },
    progress: {
      type: Number,
      default: 0, // we'll calculate later
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
