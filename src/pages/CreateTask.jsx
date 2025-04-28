import { useState } from "react";
import axiosClient from "../api/axiosClient"; // ✅ Your ready-made client
import { toast } from "react-toastify"; // (We'll install if not yet)

function CreateTask() {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([{ name: "", completed: false }]);
  const [deadline, setDeadline] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/tasks", {
        title,
        list,
        deadline,
      });
      toast.success("Task Created Successfully!");
      // Clear the form
      setTitle("");
      setList([{ name: "", completed: false }]);
      setDeadline("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create task.");
    }
  };

  // Handle list item change
  const handleListChange = (index, event) => {
    const updatedList = [...list];
    updatedList[index].name = event.target.value;
    setList(updatedList);
  };

  // Add new sub-task
  const addListItem = () => {
    setList([...list, { name: "", completed: false }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        {/* List of Sub-tasks */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sub-tasks:</h3>
          {list.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Sub-task ${index + 1}`}
              value={item.name}
              onChange={(e) => handleListChange(index, e)}
              className="w-full border rounded p-2"
            />
          ))}
          <button
            type="button"
            onClick={addListItem}
            className="text-blue-500 mt-2"
          >
            + Add Sub-task
          </button>
        </div>

        {/* Deadline Picker */}
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
