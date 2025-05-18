import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient"; 
import { toast } from "react-toastify"; 
import NavBar from "../components/NavBar"; 
import { useAuth } from "../context/AuthContext";
import { TbXboxXFilled } from "react-icons/tb";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState([{ title: "", completed: false }]);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("12:00");
  const [priority, setPriority] = useState("Medium");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchTasks, tasks } = useAuth();

  useEffect(() => {
    // Set default date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;
    setDueDate(defaultDate);

    // Set date input min and max attributes
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
      dateInput.min = defaultDate;
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 7);
      const maxYear = maxDate.getFullYear();
      const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
      const maxDay = String(maxDate.getDate()).padStart(2, '0');
      dateInput.max = `${maxYear}-${maxMonth}-${maxDay}`;
    }
  }, []);

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
    
    // Filter out empty subtasks
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
      
      await axiosClient.post('/tasks', {
        title: title.trim(),
        subtasks: validSubtasks,
        dueDate: combinedDateTime,
        priority
      });
      
      toast.success("Task created successfully!");
      await fetchTasks();
      navigate("/home");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <NavBar />
      
      <div className="max-w-xl mx-auto p-4 pt-20">
        <div className="bg-zinc-800/90 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50">
          <h1 className="text-3xl font-bold mb-4 text-center">Create New Task</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Enter your task title..."
                required
              />
            </div>

            {/* Subtasks */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Subtasks</label>
                <button
                  type="button"
                  onClick={addSubtask}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span className="text-lg">+</span> Add Subtask
                </button>
              </div>
              
              <div className="space-y-2">
                {subtasks.map((subtask, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <textarea
                      value={subtask.title}
                      onChange={(e) => handleSubtaskChange(index, e.target.value)}
                      className="flex-1 min-h-[60px] p-2.5 rounded-md bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder={`Subtask ${index + 1}`}
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={() => removeSubtask(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <TbXboxXFilled />
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
                  className="w-full p-2.5 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  />
                  <select
                    value={dueTime.split(':')[1] === '00' ? 'AM' : 'PM'}
                    onChange={(e) => {
                      const [hours] = dueTime.split(':');
                      const newHours = e.target.value === 'PM' && parseInt(hours) < 12 ? (parseInt(hours) + 12) : hours;
                      setDueTime(`${newHours.toString().padStart(2, '0')}:00`);
                    }}
                    className="w-20 p-2.5 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-3">Priority</label>
              <div className="flex gap-2 justify-center">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={priority === "Low"}
                    onChange={() => setPriority("Low")}
                    className="hidden"
                  />
                  <div
                    className={`w-full p-3 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      priority === "Low" ? "bg-green-500/20 text-green-400" : "hover:bg-green-500/10"
                    }`}
                  >
                    <span className="text-sm">Low</span>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={priority === "Medium"}
                    onChange={() => setPriority("Medium")}
                    className="hidden"
                  />
                  <div
                    className={`w-full p-3 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      priority === "Medium" ? "bg-blue-500/20 text-blue-400" : "hover:bg-blue-500/10"
                    }`}
                  >
                    <span className="text-sm">Medium</span>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === "High"}
                    onChange={() => setPriority("High")}
                    className="hidden"
                  />
                  <div
                    className={`w-full p-3 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      priority === "High" ? "bg-red-500/20 text-red-400" : "hover:bg-red-500/10"
                    }`}
                  >
                    <span className="text-sm">High</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>Create Task</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
