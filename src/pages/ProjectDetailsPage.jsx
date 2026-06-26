import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaTasks } from 'react-icons/fa';

const ProjectDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/projects" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
          <FaArrowLeft /> Back to Projects
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Details</h1>
        <p className="text-gray-600 mt-2">Project ID: {id}</p>
        
        <div className="mt-6 flex gap-4">
          <Link
            to={`/projects/${id}/board`}
            className="btn-primary flex items-center gap-2"
          >
            <FaTasks /> View Kanban Board
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;