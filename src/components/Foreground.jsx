import React, { useRef } from "react";
import Card from "./Card";
import { useAuth } from "../context/AuthContext";

function Foreground() {
  const ref = useRef(null);
  const { tasks, loading } = useAuth();

  console.log("Foreground rendering with tasks:", tasks, "Loading:", loading);

  // Show loading state only when loading is true and tasks is not yet loaded
  if (loading && !Array.isArray(tasks)) {
    console.log("Foreground: Loading tasks...");
    return <p className="text-white text-xl">Loading tasks...</p>;
  }

  // If tasks is not an array (shouldn't happen with our fix, but good to be safe)
  if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array:", tasks);
    return <p className="text-white text-xl">Error loading tasks. Please try again.</p>;
  }

  console.log("✅ Tasks from context:", tasks);

  return (
    <div
      ref={ref}
      className="fixed w-full h-screen z-[3] flex gap-12 flex-wrap p-12"
    >
      {tasks.length > 0 ? (
        tasks.map((task, index) => {
          console.log("Rendering task:", task);
          if (!task) return null; // Skip any null/undefined tasks
          
          const changeColor = index % 2 === 0 ? "bg-green-600" : "bg-blue-600";
          return (
            <Card
              key={task._id || index}
              data={{
                desc: task.title || "No Title",
                fileSize: task.fileSize || "N/A",
                close: task.completed,
                tag: {
                  isOpen: true,
                  tagTitle: task.priority || "Normal",
                },
              }}
              bgColor={changeColor}
              reference={ref}
            />
          );
        })
      ) : (
        <p className="text-white text-xl">No tasks available. Create your first task to get started!</p>
      )}
    </div>
  );
}

export default Foreground;
