import axiosInstance from './axios';

export const taskApi = {
  // Get tasks for a project
  getByProject: (projectId, params) => 
    axiosInstance.get(`/projects/${projectId}/tasks`, { params }),
  
  // Get task by ID
  getById: (projectId, taskId) => 
    axiosInstance.get(`/projects/${projectId}/tasks/${taskId}`),
  
  // Create task
  create: (projectId, data) => 
    axiosInstance.post(`/projects/${projectId}/tasks`, data),
  
  // Update task
  update: (projectId, taskId, data) => 
    axiosInstance.put(`/projects/${projectId}/tasks/${taskId}`, data),
  
  // Update task status
  updateStatus: (projectId, taskId, status) => 
    axiosInstance.patch(`/projects/${projectId}/tasks/${taskId}/status?status=${status}`),
  
  // Assign task to user
  assign: (projectId, taskId, assigneeId) => 
    axiosInstance.patch(`/projects/${projectId}/tasks/${taskId}/assign?assigneeId=${assigneeId}`),
  
  // Delete task
  delete: (projectId, taskId) => 
    axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}`),
  
  // Get overdue tasks
  getOverdue: (projectId) => 
    axiosInstance.get(`/projects/${projectId}/tasks/overdue`),
};

export default taskApi;