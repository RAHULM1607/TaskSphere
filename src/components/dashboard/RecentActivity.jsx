import React from 'react';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaPlus, FaClock, FaCheckCircle } from 'react-icons/fa';

const RecentActivity = ({ projects = [] }) => {
  // Format date to relative time
  const getTimeAgo = (date) => {
    if (!date) return 'Recently';
    
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return past.toLocaleDateString();
  };

  // Generate activity items
  const getActivities = () => {
    const activities = [];
    
    // Add project creation activities
    projects.forEach(project => {
      activities.push({
        id: `project-${project.id}`,
        type: 'project_created',
        title: `Created project "${project.name}"`,
        date: project.createdAt,
        link: `/projects/${project.id}`,
        icon: <FaProjectDiagram className="text-blue-500" />,
      });
    });
    
    // Sort by date (newest first)
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Return only recent activities (last 5)
    return activities.slice(0, 5);
  };

  const activities = getActivities();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_created':
        return <FaPlus className="text-green-500" />;
      case 'task_completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'task_overdue':
        return <FaClock className="text-red-500" />;
      default:
        return <FaProjectDiagram className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <Link to="/projects" className="text-sm text-primary-600 hover:text-primary-700">
          View All
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">No recent activity</p>
          <Link to="/projects" className="btn-primary mt-4 inline-block">
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                {activity.icon || getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                {activity.link ? (
                  <Link
                    to={activity.link}
                    className="text-sm text-gray-800 hover:text-primary-600 hover:underline"
                  >
                    {activity.title}
                  </Link>
                ) : (
                  <p className="text-sm text-gray-800">{activity.title}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {getTimeAgo(activity.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;