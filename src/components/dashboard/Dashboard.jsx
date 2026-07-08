import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectApi } from '../../api/projectApi';
import { taskApi } from '../../api/taskApi';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import { FaProjectDiagram, FaTasks, FaCheckCircle, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    completionRate: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects
      const projectsResponse = await projectApi.getAll();
      const projects = projectsResponse.data?.content || [];
      setRecentProjects(projects.slice(0, 5));
      
      // Fetch tasks for each project (simplified)
      let totalTasks = 0;
      let completedTasks = 0;
      let overdueTasks = 0;
      
      for (const project of projects) {
        try {
          const tasksResponse = await taskApi.getByProject(project.id);
          const tasks = tasksResponse.data?.content || [];
          totalTasks += tasks.length;
          completedTasks += tasks.filter(t => t.status === 'DONE').length;
          overdueTasks += tasks.filter(t => t.status !== 'DONE' && new Date(t.dueDate) < new Date()).length;
        } catch (error) {
          console.error(`Error fetching tasks for project ${project.id}:`, error);
        }
      }
      
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      setStats({
        totalProjects: projects.length,
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your projects
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaProjectDiagram className="text-white text-xl" />}
          label="Total Projects"
          value={stats.totalProjects}
          color="bg-blue-500"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          icon={<FaTasks className="text-white text-xl" />}
          label="Total Tasks"
          value={stats.totalTasks}
          color="bg-purple-500"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          icon={<FaCheckCircle className="text-white text-xl" />}
          label="Completed Tasks"
          value={stats.completedTasks}
          color="bg-green-500"
          trend="up"
          trendValue={`${stats.completionRate}%`}
        />
        <StatCard
          icon={<FaClock className="text-white text-xl" />}
          label="Overdue Tasks"
          value={stats.overdueTasks}
          color="bg-red-500"
          trend="down"
          trendValue="-3%"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity projects={recentProjects} />
        </div>
        
        {/* Quick Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Project Completion</span>
                <span>{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Projects</span>
                <span className="font-semibold text-gray-800">
                  {stats.totalProjects - (stats.totalProjects > 0 ? 1 : 0)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Avg Tasks per Project</span>
                <span className="font-semibold text-gray-800">
                  {stats.totalProjects > 0 ? Math.round(stats.totalTasks / stats.totalProjects) : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;