import axiosInstance from './axios';

// ✅ Named exports (correct way)
export const projectApi = {
  // Get all projects
  getAll: () => axiosInstance.get('/projects'),
  
  // Get project by ID
  getById: (id) => axiosInstance.get(`/projects/${id}`),
  
  // Create project
  create: (data) => axiosInstance.post('/projects', data),
  
  // Update project
  update: (id, data) => axiosInstance.put(`/projects/${id}`, data),
  
  // Delete project
  delete: (id) => axiosInstance.delete(`/projects/${id}`),
  
  // Add member to project
  addMember: (projectId, memberId) => 
    axiosInstance.post(`/projects/${projectId}/members/${memberId}`),
};

// ✅ Also export default if needed
export default projectApi;