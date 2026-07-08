// ============================================
// Date Helpers
// ============================================

/**
 * Format a date string or Date object
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time', 'date-time')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const options = {
    short: { month: 'short', day: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    'date-time': { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
  };
  
  return d.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const timeAgo = (date) => {
  if (!date) return 'Recently';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};

/**
 * Check if a date is overdue
 * @param {string|Date} date - Date to check
 * @param {string} status - Task status ('DONE' skips overdue check)
 * @returns {boolean} True if overdue
 */
export const isOverdue = (date, status = '') => {
  if (!date || status === 'DONE') return false;
  return new Date(date) < new Date();
};

/**
 * Check if a date is today
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if today
 */
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const check = new Date(date);
  return check.toDateString() === today.toDateString();
};

// ============================================
// Color Helpers
// ============================================

/**
 * Get priority color class
 * @param {string} priority - LOW, MEDIUM, HIGH, CRITICAL
 * @returns {string} Tailwind color classes
 */
export const getPriorityColor = (priority) => {
  const colors = {
    LOW: 'bg-gray-100 text-gray-600',
    MEDIUM: 'bg-blue-100 text-blue-700',
    HIGH: 'bg-orange-100 text-orange-700',
    CRITICAL: 'bg-red-100 text-red-700',
  };
  return colors[priority] || colors.MEDIUM;
};

/**
 * Get priority emoji
 * @param {string} priority - LOW, MEDIUM, HIGH, CRITICAL
 * @returns {string} Emoji
 */
export const getPriorityEmoji = (priority) => {
  const emojis = {
    LOW: '🟢',
    MEDIUM: '🔵',
    HIGH: '🟠',
    CRITICAL: '🔴',
  };
  return emojis[priority] || '⚪';
};

/**
 * Get task status color class
 * @param {string} status - TODO, IN_PROGRESS, REVIEW, TESTING, DONE
 * @returns {string} Tailwind color classes
 */
export const getStatusColor = (status) => {
  const colors = {
    TODO: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    REVIEW: 'bg-yellow-100 text-yellow-800',
    TESTING: 'bg-purple-100 text-purple-800',
    DONE: 'bg-green-100 text-green-800',
  };
  return colors[status] || colors.TODO;
};

/**
 * Get project status color class
 * @param {string} status - PLANNING, ACTIVE, ON_HOLD, COMPLETED
 * @returns {string} Tailwind color classes
 */
export const getProjectStatusColor = (status) => {
  const colors = {
    PLANNING: 'bg-blue-100 text-blue-800',
    ACTIVE: 'bg-green-100 text-green-800',
    ON_HOLD: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-purple-100 text-purple-800',
  };
  return colors[status] || colors.PLANNING;
};

/**
 * Get random color from PROJECT_COLORS
 * @returns {string} Hex color code
 */
export const getRandomColor = () => {
  const colors = [
    '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#34D399',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// ============================================
// Text Helpers
// ============================================

/**
 * Truncate text to a certain length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + suffix;
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert status to display name
 * @param {string} status - Status key (e.g., 'IN_PROGRESS')
 * @returns {string} Display name (e.g., 'In Progress')
 */
export const statusToDisplay = (status) => {
  if (!status) return '';
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Generate a slug from a string
 * @param {string} str - String to slugify
 * @returns {string} Slug
 */
export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ============================================
// Validation Helpers
// ============================================

/**
 * Check if email is valid
 * @param {string} email - Email to check
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Check if phone number is valid (optional)
 * @param {string} phone - Phone number to check
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return true; // Optional field
  const regex = /^\d{10}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

// ============================================
// Storage Helpers
// ============================================

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Stored value
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeStorage = (key) => {
  localStorage.removeItem(key);
};

/**
 * Clear all localStorage
 */
export const clearStorage = () => {
  localStorage.clear();
};

// ============================================
// File Helpers
// ============================================

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ============================================
// Array Helpers
// ============================================

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  if (!array || !Array.isArray(array)) return {};
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {boolean} asc - Sort ascending (default: true)
 * @returns {Array} Sorted array
 */
export const sortBy = (array, key, asc = true) => {
  if (!array || !Array.isArray(array)) return [];
  return [...array].sort((a, b) => {
    const valA = a[key] || '';
    const valB = b[key] || '';
    if (typeof valA === 'string') {
      return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return asc ? valA - valB : valB - valA;
  });
};

// ============================================
// URL Helpers
// ============================================

/**
 * Get query parameters from URL
 * @param {string} url - URL to parse (default: window.location.search)
 * @returns {Object} Query parameters
 */
export const getQueryParams = (url) => {
  const search = url ? new URL(url).search : window.location.search;
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Build URL with query parameters
 * @param {string} base - Base URL
 * @param {Object} params - Query parameters
 * @returns {string} Full URL
 */
export const buildUrl = (base, params = {}) => {
  const url = new URL(base);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// ============================================
// Export all as default object
// ============================================
export default {
  formatDate,
  timeAgo,
  isOverdue,
  isToday,
  getPriorityColor,
  getPriorityEmoji,
  getStatusColor,
  getProjectStatusColor,
  getRandomColor,
  truncateText,
  capitalize,
  statusToDisplay,
  slugify,
  isValidEmail,
  isValidPhone,
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  getFileExtension,
  formatFileSize,
  groupBy,
  sortBy,
  getQueryParams,
  buildUrl,
};