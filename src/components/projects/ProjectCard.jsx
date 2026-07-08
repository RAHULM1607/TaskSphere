import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaTasks, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      PLANNING: 'bg-blue-100 text-blue-800',
      ACTIVE: 'bg-green-100 text-green-800',
      ON_HOLD: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusEmoji = (status) => {
    const emojis = {
      PLANNING: '📋',
      ACTIVE: '🚀',
      ON_HOLD: '⏸️',
      COMPLETED: '✅',
    };
    return emojis[status] || '📌';
  };

  const memberCount = project.members?.length || 1;
  const taskCount = project.taskCount || 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Color Bar */}
      <div
        className="h-1.5"
        style={{ backgroundColor: project.colorCode || '#4F46E5' }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 truncate flex-1">
            {project.name}
          </h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(project.status)}`}>
            {getStatusEmoji(project.status)} {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 min-h-[40px]">
          {project.description || 'No description provided'}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaUsers className="text-gray-400" />
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </span>
          <span className="flex items-center gap-1">
            <FaTasks className="text-gray-400" />
            {taskCount} tasks
          </span>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-400 mb-4">
          {project.startDate && project.endDate ? (
            <>
              📅 {project.startDate} → {project.endDate}
            </>
          ) : project.startDate ? (
            <>📅 Starts: {project.startDate}</>
          ) : project.endDate ? (
            <>📅 Ends: {project.endDate}</>
          ) : (
            <>📅 No dates set</>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <Link
            to={`/projects/${project.id}`}
            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1.5"
          >
            <FaEye size={12} /> View
          </Link>
          <button
            onClick={() => onEdit(project)}
            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1.5"
          >
            <FaEdit size={12} /> Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm flex items-center justify-center"
          >
            <FaTrash size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;