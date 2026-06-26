import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../api/projectApi';
import { FaProjectDiagram, FaTasks, FaCheckCircle, FaClock } from 'react-icons/fa';

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold mt-1">{value || 0}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const projects = await projectApi.getAll();
      // TODO: Add task stats from API
      setStats({
        totalProjects: projects.data.content?.length || 0,
        totalTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaProjectDiagram className="text-white text-xl" />}
          label="Total Projects"
          value={stats.totalProjects}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaTasks className="text-white text-xl" />}
          label="Total Tasks"
          value={stats.totalTasks}
          color="bg-purple-500"
        />
        <StatCard
          icon={<FaCheckCircle className="text-white text-xl" />}
          label="Completed"
          value={stats.completedTasks}
          color="bg-green-500"
        />
        <StatCard
          icon={<FaClock className="text-white text-xl" />}
          label="Overdue"
          value={stats.overdueTasks}
          color="bg-red-500"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
          <p className="text-gray-500 text-sm">No projects yet. Create your first project!</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-500 text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;