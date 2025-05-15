import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    subtasks: [{
      title: {
        type: String,
        required: true,
        trim: true
      },
      completed: {
        type: Boolean,
        default: false
      }
    }],
    dueDate: {
      type: Date,
      required: true
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Calculate progress based on completed subtasks
taskSchema.virtual('progress').get(function() {
  if (this.subtasks.length === 0) return 0;
  const completed = this.subtasks.filter(subtask => subtask.completed).length;
  return Math.round((completed / this.subtasks.length) * 100);
});

// Update completed status if all subtasks are done
taskSchema.pre('save', function(next) {
  if (this.isModified('subtasks')) {
    this.completed = this.subtasks.length > 0 && 
                    this.subtasks.every(subtask => subtask.completed);
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;