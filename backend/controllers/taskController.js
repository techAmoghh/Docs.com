import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, list, deadline } = req.body;
    const task = new Task({
      title,
      list,
      deadline,
      owner: req.user.id,
      progress: calculateProgress(list), // 🛠️ Calculate initial progress!
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("==== Incoming Update Task Request ====");
    console.log("Task ID from URL:", id);
    console.log("User ID from Token (req.user.id):", req.user.id);
    console.log("Request Body:", req.body);

    // If list is updated, recalculate progress
    if (req.body.list) {
      req.body.progress = calculateProgress(req.body.list);
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );
    console.log("Updated Task: ", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    console.log("==== Incoming Delete Task Request ===="); // ➡️ Terminal tracking
    console.log("Task ID from URL:", req.params.id);
    console.log("User ID from Token (req.user.id):", req.user.id);

    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized!" });
    }

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper to calculate progress percentage
const calculateProgress = (list) => {
  if (!list || list.length === 0) return 0;
  const completedCount = list.filter((item) => item.completed).length;
  return (completedCount / list.length) * 100;
};
