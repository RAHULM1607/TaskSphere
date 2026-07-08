import React, { useState } from 'react';
import { taskApi } from '../../api/taskApi';
import { FaTimes, FaUser, FaCalendar, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const TaskDetailModal = ({ task, projectId, onClose, onEdit, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      LOW: 'bg-gray-100 text-gray-600',
      MEDIUM: 'bg-blue-100 text-blue-700',
      HIGH: 'bg-orange-100 text-orange-700',
      CRITICAL: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-600';
  };

  const getStatusColor = (status) => {
    const colors = {
      TODO: 'bg-gray-100 text-gray-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      REVIEW: 'bg-yellow-100 text-yellow-800',
      TESTING: 'bg-purple-100 text-purple-800',
      DONE: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeEmoji = (type) => {
    const emojis = {
      TASK: '📋',
      BUG: '🐛',
      FEATURE: '✨',
      IMPROVEMENT: '🔄',
    };
    return emojis[type] || '📌';
  };

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await taskApi.delete(projectId, task.id);
      toast.success('Task deleted successfully!');
      onDelete();
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error(err.response?.data?.message || 'Failed to delete task');
      setDeleting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                {getTypeEmoji(task.type)} {task.type}
              </span>
              <span className="text-xs text-gray-400">#{task.id}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
              title="Edit Task"
            >
              <FaEdit size={18} />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Delete Task"
            >
              <FaTrash size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p className="text-gray-600 whitespace-pre-wrap">
              {task.description || 'No description provided'}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Assignee</h4>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaUser size={14} />
                <span>{task.assignee?.name || 'Unassigned'}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Reporter</h4>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaUser size={14} />
                <span>{task.reporter?.name || 'Unknown'}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Due Date</h4>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaCalendar size={14} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Estimated Hours</h4>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaClock size={14} />
                <span>{task.estimatedHours ? `${task.estimatedHours}h` : 'Not set'}</span>
              </div>
            </div>
            {task.actualHours && (
              <div>
                <h4 className="text-sm font-medium text-gray-700">Actual Hours</h4>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <FaClock size={14} />
                  <span>{task.actualHours}h</span>
                </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-700">Version</h4>
              <p className="text-gray-600 mt-1">v{task.version || 1}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 text-sm">
              💬 {task.commentCount || 0} comment{task.commentCount !== 1 && 's'}
              <button className="block mx-auto mt-2 text-primary-600 hover:text-primary-700 text-sm">
                Add comment
              </button>
            </div>
          </div>

          {/* Created/Updated Info */}
          <div className="text-xs text-gray-400 border-t pt-4">
            <p>Created: {formatDate(task.createdAt)}</p>
            <p>Updated: {formatDate(task.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Task?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "<strong>{task.title}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Task'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailModal;