import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-primary-600 tracking-tight">
              TaskSphere
            </h1>
          </Link>
          <p className="mt-2 text-gray-600">
            {subtitle || 'Task Management Made Simple'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {title && (
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {title}
            </h2>
          )}
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} TaskSphere. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;