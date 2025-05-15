import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    // Check task limit (10 tasks per user)
    const taskCount = await Task.countDocuments({ owner: req.user.id });
    if (taskCount >= 10) {
      return res.status(400).json({ 
        success: false, 
        message: 'Maximum limit of 10 tasks reached' 
      });
    }

    const { title, description, subtasks, dueDate, priority } = req.body;
    
    const task = new Task({
      title,
      description,
      subtasks: subtasks || [],
      dueDate,
      priority: priority || 'Medium',
      owner: req.user.id
    });

    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to create task' 
    });
  }
};

// Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id })
      .sort({ dueDate: 1, priority: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'subtasks', 'dueDate', 'priority', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    updates.forEach(update => task[update] = req.body[update]);
    await task.save();
    
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle subtask completion
export const toggleSubtask = async (req, res) => {
  try {
    const { taskId, subtaskIndex } = req.params;
    const task = await Task.findOne({ _id: taskId, owner: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const subtask = task.subtasks[subtaskIndex];
    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    // Toggle completion status
    task.subtasks[subtaskIndex].completed = !subtask.completed;
    await task.save();
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
