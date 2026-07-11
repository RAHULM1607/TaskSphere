import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { taskApi } from '../../api/taskApi';
import { projectApi } from '../../api/projectApi';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskDetailModal from './TaskDetailModal';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const KanbanBoard = () => {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'bg-gray-100' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'REVIEW', title: 'Review', color: 'bg-yellow-50' },
    { id: 'TESTING', title: 'Testing', color: 'bg-purple-50' },
    { id: 'DONE', title: 'Done', color: 'bg-green-50' },
  ];

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch project details
      const projectResponse = await projectApi.getById(projectId);
      setProject(projectResponse.data);

      // Fetch tasks
      const tasksResponse = await taskApi.getByProject(projectId);
      const taskList = tasksResponse.data.content || [];

      // Group tasks by status
      const groupedTasks = {};
      columns.forEach(col => {
        groupedTasks[col.id] = taskList.filter(task => task.status === col.id);
      });
      setTasks(groupedTasks);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message || 'Failed to load board');
      toast.error('Failed to load board');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskMove = async (taskId, newStatus) => {
    try {
      await taskApi.updateStatus(projectId, taskId, newStatus);
      
      // Update local state
      setTasks(prev => {
        const newTasks = { ...prev };
        // Find task in old column
        let movedTask = null;
        for (const [status, taskList] of Object.entries(newTasks)) {
          const index = taskList.findIndex(t => t.id === taskId);
          if (index !== -1) {
            movedTask = taskList.splice(index, 1)[0];
            movedTask.status = newStatus;
            break;
          }
        }
        if (movedTask) {
          newTasks[newStatus] = [...newTasks[newStatus], movedTask];
        }
        return newTasks;
      });

      toast.success('Task moved successfully');
    } catch (err) {
      console.error('Error moving task:', err);
      toast.error('Failed to move task');
      fetchData(); // Refresh to ensure consistency
    }
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    fetchData();
  };

  const handleTaskUpdated = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    fetchData();
  };

  const handleTaskDeleted = () => {
    setShowDetailModal(false);
    setSelectedTask(null);
    fetchData();
  };

  const openTaskForm = (task = null) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
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
        <ErrorMessage message={error} onRetry={fetchData} />
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

  const getTaskCount = (status) => tasks[status]?.length || 0;

  return (
    <div className="p-4 md:p-6">
      {/* Header with ADD TASK BUTTON - FIXED */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Link to={`/projects/${projectId}`} className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm mb-1">
            <FaArrowLeft /> Back to Project
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-sm text-gray-500">Kanban Board</p>
        </div>
        
        {/* ✅ ADD TASK BUTTON - NOW WITH DIRECT TAILWIND CLASSES (NOT btn-primary) */}
        <button
          onClick={() => openTaskForm()}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FaPlus /> Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
        {columns.map((column) => (
          <div key={column.id} className="min-w-50 flex-1">
            <div className={`${column.color} rounded-t-xl p-3`}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">{column.title}</h3>
                <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                  {getTaskCount(column.id)}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-b-xl p-3 min-h-[300px]">
              {tasks[column.id]?.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  Empty
                </div>
              ) : (
                tasks[column.id]?.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMove={handleTaskMove}
                    onClick={openTaskDetail}
                    onEdit={openTaskForm}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          projectId={projectId}
          task={editingTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onSuccess={editingTask ? handleTaskUpdated : handleTaskCreated}
        />
      )}

      {/* Task Detail Modal */}
      {showDetailModal && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          projectId={projectId}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedTask(null);
          }}
          onEdit={() => {
            setShowDetailModal(false);
            openTaskForm(selectedTask);
          }}
          onDelete={handleTaskDeleted}
        />
      )}
    </div>
  );
};

export default KanbanBoard;