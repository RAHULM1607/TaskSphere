import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import Dashboard from '../components/dashboard/Dashboard';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { fetchProjects, loading } = useProjects();

  useEffect(() => {
    // ✅ Only fetch projects if authenticated
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  // If user is logged in, show dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // If not logged in, show landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">TaskSphere</h1>
          <div className="flex gap-3">
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Manage Your Projects
            <span className="text-primary-600"> Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6">
            TaskSphere helps teams plan, track, and complete projects
            with an intuitive Kanban board and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Start Free Trial
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature cards... */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TaskSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;