import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState([{ title: "", completed: false }]);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("12:00");
  const [priority, setPriority] = useState("Medium");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchTasks } = useAuth();

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosClient.get(`/tasks/${id}`);
        const task = response.data;
        setTitle(task.title);
        setSubtasks(task.subtasks || [{ title: "", completed: false }]);
        
        if (task.dueDate) {
          const date = new Date(task.dueDate);
          setDueDate(date.toISOString().split('T')[0]);
          setDueTime(date.toTimeString().slice(0, 5));
        }
        
        setPriority(task.priority || "Medium");
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error("Failed to load task");
        navigate("/home");
      }
    };

    fetchTask();
  }, [id, navigate]);

  const addSubtask = () => {
    if (subtasks.length >= 10) {
      toast.error("Maximum of 10 subtasks allowed");
      return;
    }
    setSubtasks([...subtasks, { title: "", completed: false }]);
  };

  const removeSubtask = (index) => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].title = value;
    setSubtasks(newSubtasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validSubtasks = subtasks.filter(subtask => subtask.title.trim() !== '');
    
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    setIsLoading(true);
    
    try {
      const combinedDateTime = dueDate ? `${dueDate}T${dueTime}` : null;
      
      await axiosClient.patch(`/tasks/${id}`, {
        title: title.trim(),
        subtasks: validSubtasks,
        dueDate: combinedDateTime,
        priority
      });
      
      toast.success("Task updated successfully!");
      await fetchTasks();
      navigate("/home");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <NavBar />
      <div className="max-w-2xl mx-auto p-6 pt-25">
        <h1 className="text-3xl font-bold mb-8">Edit Task</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Subtasks */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Subtasks</label>
              <button
                type="button"
                onClick={addSubtask}
                className="text-sm text-blue-500 hover:text-blue-400 flex items-center"
              >
                <span className="mr-1">+</span> Add Subtask
              </button>
            </div>
            
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={subtask.title}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-700"
                    placeholder={`Subtask ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Due Date *</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Update Task'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
