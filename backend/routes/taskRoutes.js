import express from 'express';
import { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  toggleSubtask 
} from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Task routes
router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

// Toggle subtask completion
router.put('/:taskId/subtasks/:subtaskIndex/toggle', toggleSubtask);

export default router;
