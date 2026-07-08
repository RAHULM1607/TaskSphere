// ============================================
// API & URL Constants
// ============================================
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/api/ws';

// ============================================
// Task Status Constants
// ============================================
export const TASK_STATUSES = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  TESTING: 'TESTING',
  DONE: 'DONE',
};

export const TASK_STATUS_OPTIONS = [
  { value: 'TODO', label: 'To Do', color: 'bg-gray-100 text-gray-800' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'REVIEW', label: 'Review', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'TESTING', label: 'Testing', color: 'bg-purple-100 text-purple-800' },
  { value: 'DONE', label: 'Done', color: 'bg-green-100 text-green-800' },
];

// ============================================
// Task Priority Constants
// ============================================
export const TASK_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
};

export const TASK_PRIORITY_OPTIONS = [
  { value: 'LOW', label: '🟢 Low', color: 'bg-gray-100 text-gray-600' },
  { value: 'MEDIUM', label: '🔵 Medium', color: 'bg-blue-100 text-blue-700' },
  { value: 'HIGH', label: '🟠 High', color: 'bg-orange-100 text-orange-700' },
  { value: 'CRITICAL', label: '🔴 Critical', color: 'bg-red-100 text-red-700' },
];

// ============================================
// Task Type Constants
// ============================================
export const TASK_TYPES = {
  TASK: 'TASK',
  BUG: 'BUG',
  FEATURE: 'FEATURE',
  IMPROVEMENT: 'IMPROVEMENT',
};

export const TASK_TYPE_OPTIONS = [
  { value: 'TASK', label: '📋 Task' },
  { value: 'BUG', label: '🐛 Bug' },
  { value: 'FEATURE', label: '✨ Feature' },
  { value: 'IMPROVEMENT', label: '🔄 Improvement' },
];

// ============================================
// Project Status Constants
// ============================================
export const PROJECT_STATUSES = {
  PLANNING: 'PLANNING',
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
};

export const PROJECT_STATUS_OPTIONS = [
  { value: 'PLANNING', label: '📋 Planning', color: 'bg-blue-100 text-blue-800' },
  { value: 'ACTIVE', label: '🚀 Active', color: 'bg-green-100 text-green-800' },
  { value: 'ON_HOLD', label: '⏸️ On Hold', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'COMPLETED', label: '✅ Completed', color: 'bg-purple-100 text-purple-800' },
];

// ============================================
// User Role Constants
// ============================================
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  TEAM_LEAD: 'TEAM_LEAD',
  MEMBER: 'MEMBER',
};

// ============================================
// Storage Keys
// ============================================
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

// ============================================
// Pagination Constants
// ============================================
export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 20,
  MAX_SIZE: 50,
};

// ============================================
// Color Palette (Random colors for projects)
// ============================================
export const PROJECT_COLORS = [
  '#4F46E5', // Indigo
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#6366F1', // Blue
  '#34D399', // Green
];

// ============================================
// Date Formats
// ============================================
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_SHORT: 'MMM DD',
  DISPLAY_LONG: 'MMMM DD, YYYY',
  API: 'YYYY-MM-DD',
  TIME: 'hh:mm A',
  DATE_TIME: 'MMM DD, YYYY hh:mm A',
};

// ============================================
// HTTP Status Codes
// ============================================
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

// ============================================
// Error Messages
// ============================================
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DUPLICATE_EMAIL: 'This email is already registered.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
};

// ============================================
// Success Messages
// ============================================
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back!',
  REGISTER: 'Registration successful! Please login.',
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  TASK_MOVED: 'Task moved successfully!',
  MEMBER_ADDED: 'Member added successfully!',
};

// ============================================
// Kanban Columns (with order)
// ============================================
export const KANBAN_COLUMNS = [
  { id: 'TODO', title: 'To Do', color: 'bg-gray-50' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-blue-50' },
  { id: 'REVIEW', title: 'Review', color: 'bg-yellow-50' },
  { id: 'TESTING', title: 'Testing', color: 'bg-purple-50' },
  { id: 'DONE', title: 'Done', color: 'bg-green-50' },
];

// ============================================
// Export all as default object
// ============================================
export default {
  API_URL,
  WS_URL,
  TASK_STATUSES,
  TASK_STATUS_OPTIONS,
  TASK_PRIORITIES,
  TASK_PRIORITY_OPTIONS,
  TASK_TYPES,
  TASK_TYPE_OPTIONS,
  PROJECT_STATUSES,
  PROJECT_STATUS_OPTIONS,
  USER_ROLES,
  STORAGE_KEYS,
  PAGINATION,
  PROJECT_COLORS,
  DATE_FORMATS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  KANBAN_COLUMNS,
};