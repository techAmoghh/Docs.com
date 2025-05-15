import React, { useState } from "react";
import { FaFileAlt, FaTrash, FaCheck, FaRegCircle } from "react-icons/fa";
import { formatDistanceToNow, parseISO, isPast, isToday } from 'date-fns';

function Card({ data, onDelete }) {
  const colors = ['bg-blue-600', 'bg-green-600', 'bg-pink-600'];
  const [cardColor, setCardColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [subtasks, setSubtasks] = useState(data.subtasks || []);

  const toggleCompletion = (e) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  const handleSubtaskToggle = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].completed = !newSubtasks[index].completed;
    setSubtasks(newSubtasks);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    return {
      formatted: formatDistanceToNow(date, { addSuffix: true }),
      isOverdue: isPast(date) && !isToday(date),
      isDueToday: isToday(date)
    };
  };

  const dueDate = data.dueDate ? formatDueDate(data.dueDate) : null;

  return (
    <div
      className={`relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 text-white overflow-hidden shadow-lg ${
        isCompleted ? 'opacity-70' : ''
      }`}
      style={{
        minHeight: '250px',
        maxHeight: 'calc(70vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar - Color indicator */}
      <div className={`absolute top-0 left-0 w-full h-1.5 ${cardColor}`} />

      {/* Completion Checkbox */}
      <div 
        className="absolute top-4 right-4 cursor-pointer z-10"
        onClick={toggleCompletion}
      >
        {isCompleted ? (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <FaCheck className="text-white text-sm" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-500" />
        )}
      </div>

      {/* Main Content - Scrollable area */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        {/* Task Title */}
        <h2 className="text-xl font-bold mb-3 pr-4">
          {data.title || "Untitled Task"}
        </h2>

        {/* Subtasks */}
        {subtasks.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Tasks</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {subtasks.map((subtask, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={subtask.completed || false}
                    onChange={() => handleSubtaskToggle(index)}
                    className="rounded text-blue-500"
                  />
                  <span className={`text-sm ${subtask.completed ? 'line-through text-gray-400' : ''}`}>
                    {subtask.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="mt-auto pt-3">
        {/* Due Date */}
        {data.dueDate && (
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <span className="mr-2">⏰</span>
            <div>
              <p className="text-sm">
                {new Date(data.dueDate).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(data.dueDate), { addSuffix: true })}
              </p>
            </div>
          </div>
        )}

        {/* Delete Button */}
        <div className="flex justify-end pt-2 border-t border-zinc-700">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="text-gray-400 hover:text-red-400 transition-colors p-1"
            aria-label="Delete task"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;