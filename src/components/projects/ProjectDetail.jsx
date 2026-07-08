import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectApi } from '../../api/projectApi';
import { taskApi } from '../../api/taskApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { FaArrowLeft, FaTasks, FaUsers, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch project details
      const projectResponse = await projectApi.getById(id);
      setProject(projectResponse.data);

      // Fetch tasks
      const tasksResponse = await taskApi.getByProject(id);
      setTasks(tasksResponse.data.content || []);

    } catch (err) {
      console.error('Error fetching project:', err);
      setError(err.response?.data?.message || 'Failed to load project');
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await projectApi.delete(id);
      toast.success('Project deleted successfully!');
      navigate('/projects');
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PLANNING: 'bg-blue-100 text-blue-800',
      ACTIVE: 'bg-green-100 text-green-800',
      ON_HOLD: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTaskStatusColor = (status) => {
    const colors = {
      TODO: 'bg-gray-100 text-gray-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      REVIEW: 'bg-yellow-100 text-yellow-800',
      TESTING: 'bg-purple-100 text-purple-800',
      DONE: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={fetchProjectData} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Project not found</p>
        <Link to="/projects" className="btn-primary mt-4 inline-block">
          Back to Projects
        </Link>
      </div>
    );
  }

  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6">
      {/* Back Button */}
      <Link to="/projects" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-6">
        <FaArrowLeft /> Back to Projects
      </Link>

      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{project.description || 'No description'}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span>👤 Owner: {project.owner?.name || 'Unknown'}</span>
              <span>👥 {project.members?.length || 1} members</span>
              {project.startDate && <span>📅 Starts: {project.startDate}</span>}
              {project.endDate && <span>📅 Ends: {project.endDate}</span>}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link to={`/projects/${id}/board`} className="btn-primary flex items-center gap-2">
              <FaTasks /> Board
            </Link>
            <button className="btn-secondary flex items-center gap-2">
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
          <p className="text-sm text-gray-500">Total Tasks</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{completionRate}%</p>
          <p className="text-sm text-gray-500">Completion Rate</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{project.members?.length || 1}</p>
          <p className="text-sm text-gray-500">Team Members</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
          <Link to={`/projects/${id}/board`} className="btn-primary text-sm flex items-center gap-1">
            <FaPlus /> Add Task
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks yet</p>
            <Link to={`/projects/${id}/board`} className="text-primary-600 hover:text-primary-700 text-sm">
              Create your first task
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{task.title}</p>
                  <p className="text-xs text-gray-500">
                    Assigned to: {task.assignee?.name || 'Unassigned'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {task.dueDate || 'No due date'}
                  </span>
                </div>
              </div>
            ))}
            {tasks.length > 5 && (
              <Link to={`/projects/${id}/board`} className="text-primary-600 hover:text-primary-700 text-sm block text-center">
                View all {tasks.length} tasks →
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Project?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "<strong>{project.name}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete Project
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

export default ProjectDetail;