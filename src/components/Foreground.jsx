import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import Card from "./Card";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axiosClient from "../api/axiosClient";

function Foreground({ reference }) {
  const { tasks, loading, fetchTasks } = useAuth();

  useEffect(() => {
    // Only fetch tasks if we don't have any yet
    if (tasks.length === 0) {
      fetchTasks().catch(console.error);
    }
  }, [fetchTasks, tasks.length]);

  if (loading && tasks.length === 0) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!Array.isArray(tasks)) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-zinc-400 text-lg">Error loading tasks. Please try again.</p>
      </div>
    );
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                drag
                dragConstraints={reference}
                dragElastic={0.1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-grab active:cursor-grabbing w-full h-full"
                style={{ position: 'relative' }}
              >
                <Card
                  data={{
                    ...task,
                    title: task.title || "Untitled Task",
                    subtasks: task.subtasks || [],
                    dueDate: task.dueDate || null,
                  }}
                  onDelete={() => handleDeleteTask(task._id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-zinc-400 text-lg">No tasks found. Create your first task to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Foreground;
