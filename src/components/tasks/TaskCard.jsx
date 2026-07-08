import React, { useState } from 'react';
import { FaUser, FaCalendar, FaEdit } from 'react-icons/fa';

const TaskCard = ({ task, onMove, onClick, onEdit }) => {
  const [isDragging, setIsDragging] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      LOW: 'bg-gray-100 text-gray-600',
      MEDIUM: 'bg-blue-100 text-blue-700',
      HIGH: 'bg-orange-100 text-orange-700',
      CRITICAL: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-600';
  };

  const getPriorityEmoji = (priority) => {
    const emojis = {
      LOW: '🟢',
      MEDIUM: '🔵',
      HIGH: '🟠',
      CRITICAL: '🔴',
    };
    return emojis[priority] || '⚪';
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('currentStatus', task.status);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && task.status !== 'DONE' && new Date(task.dueDate) < new Date();

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onClick(task)}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-3 mb-2 cursor-pointer border-l-4 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'
      } ${isOverdue ? 'border-red-500' : 'border-primary-500'}`}
    >
      {/* Title */}
      <div className="flex justify-between items-start gap-2">
        <h4 className="text-sm font-medium text-gray-800 flex-1 line-clamp-2">
          {task.title}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-gray-400 hover:text-primary-600 transition-colors duration-200 flex-shrink-0"
        >
          <FaEdit size={12} />
        </button>
      </div>

      {/* Description preview */}
      {task.description && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {/* Priority */}
        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
          {getPriorityEmoji(task.priority)} {task.priority}
        </span>

        {/* Assignee */}
        {task.assignee && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <FaUser size={10} />
            {task.assignee.name}
          </span>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
            <FaCalendar size={10} />
            {formatDate(task.dueDate)}
            {isOverdue && ' ⚠️'}
          </span>
        )}
      </div>

      {/* Task ID and comments count */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">#{task.id}</span>
        {task.commentCount > 0 && (
          <span className="text-xs text-gray-400">💬 {task.commentCount}</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;