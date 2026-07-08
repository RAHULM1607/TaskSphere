import React from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const TaskFilters = ({ filters, onFilterChange, onClear }) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'TODO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'REVIEW', label: 'Review' },
    { value: 'TESTING', label: 'Testing' },
    { value: 'DONE', label: 'Done' },
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'LOW', label: '🟢 Low' },
    { value: 'MEDIUM', label: '🔵 Medium' },
    { value: 'HIGH', label: '🟠 High' },
    { value: 'CRITICAL', label: '🔴 Critical' },
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'TASK', label: '📋 Task' },
    { value: 'BUG', label: '🐛 Bug' },
    { value: 'FEATURE', label: '✨ Feature' },
    { value: 'IMPROVEMENT', label: '🔄 Improvement' },
  ];

  const handleChange = (name, value) => {
    onFilterChange({ ...filters, [name]: value });
  };

  const hasActiveFilters = filters.search || filters.status || filters.priority || filters.type;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="input-field md:w-40"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="input-field md:w-40"
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={filters.type || ''}
          onChange={(e) => handleChange('type', e.target.value)}
          className="input-field md:w-40"
        >
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Clear Button */}
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="btn-secondary flex items-center gap-2 whitespace-nowrap"
          >
            <FaTimes size={12} /> Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FaFilter size={12} /> Active filters:
          </span>
          {filters.search && (
            <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
              Search: "{filters.search}"
            </span>
          )}
          {filters.status && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              Status: {filters.status.replace('_', ' ')}
            </span>
          )}
          {filters.priority && (
            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
              Priority: {filters.priority}
            </span>
          )}
          {filters.type && (
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
              Type: {filters.type}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskFilters;