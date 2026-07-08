import React, { createContext, useState, useContext } from 'react';
import { projectApi } from '../api/projectApi';
import { taskApi } from '../api/taskApi';
import toast from 'react-hot-toast';

// ✅ Create and export the context
export const ProjectContext = createContext();

// ✅ Create and export the hook
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectApi.getAll();
      const projectData = response.data.content || [];
      setProjects(projectData);
      return projectData;
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.message || 'Failed to load projects');
      toast.error('Failed to load projects');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch single project
  const fetchProjectById = async (projectId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectApi.getById(projectId);
      setCurrentProject(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching project:', err);
      setError(err.response?.data?.message || 'Failed to load project');
      toast.error('Failed to load project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create project
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectApi.create(projectData);
      const newProject = response.data;
      setProjects(prev => [newProject, ...prev]);
      toast.success('Project created successfully!');
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      const errorMsg = err.response?.data?.message || 'Failed to create project';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update project
  const updateProject = async (projectId, projectData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectApi.update(projectId, projectData);
      const updatedProject = response.data;
      
      setProjects(prev => 
        prev.map(p => p.id === projectId ? updatedProject : p)
      );
      
      if (currentProject?.id === projectId) {
        setCurrentProject(updatedProject);
      }
      
      toast.success('Project updated successfully!');
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update project';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      setLoading(true);
      setError(null);
      await projectApi.delete(projectId);
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
      }
      
      toast.success('Project deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting project:', err);
      const errorMsg = err.response?.data?.message || 'Failed to delete project';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add member to project
  const addMember = async (projectId, memberId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectApi.addMember(projectId, memberId);
      const updatedProject = response.data;
      
      setProjects(prev => 
        prev.map(p => p.id === projectId ? updatedProject : p)
      );
      
      if (currentProject?.id === projectId) {
        setCurrentProject(updatedProject);
      }
      
      toast.success('Member added successfully!');
      return updatedProject;
    } catch (err) {
      console.error('Error adding member:', err);
      const errorMsg = err.response?.data?.message || 'Failed to add member';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks
  const fetchTasks = async (projectId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.getByProject(projectId);
      const taskData = response.data.content || [];
      setTasks(taskData);
      return taskData;
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (projectId, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.create(projectId, taskData);
      const newTask = response.data;
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully!');
      return newTask;
    } catch (err) {
      console.error('Error creating task:', err);
      const errorMsg = err.response?.data?.message || 'Failed to create task';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (projectId, taskId, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.update(projectId, taskId, taskData);
      const updatedTask = response.data;
      
      setTasks(prev => 
        prev.map(t => t.id === taskId ? updatedTask : t)
      );
      
      toast.success('Task updated successfully!');
      return updatedTask;
    } catch (err) {
      console.error('Error updating task:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update task';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update task status
  const updateTaskStatus = async (projectId, taskId, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.updateStatus(projectId, taskId, status);
      const updatedTask = response.data;
      
      setTasks(prev => 
        prev.map(t => t.id === taskId ? updatedTask : t)
      );
      
      return updatedTask;
    } catch (err) {
      console.error('Error updating task status:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update task status';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (projectId, taskId) => {
    try {
      setLoading(true);
      setError(null);
      await taskApi.delete(projectId, taskId);
      
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting task:', err);
      const errorMsg = err.response?.data?.message || 'Failed to delete task';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Reset state
  const resetState = () => {
    setProjects([]);
    setCurrentProject(null);
    setTasks([]);
    setError(null);
    setLoading(false);
  };

  const value = {
    projects,
    currentProject,
    tasks,
    loading,
    error,
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMember,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    clearError,
    resetState,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;