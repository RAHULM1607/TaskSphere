import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const KanbanPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to={`/projects/${id}`} className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
          <FaArrowLeft /> Back to Project
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
        <p className="text-gray-600 mt-2">Project ID: {id}</p>
        
        <div className="mt-6 grid grid-cols-5 gap-4">
          {['TODO', 'IN_PROGRESS', 'REVIEW', 'TESTING', 'DONE'].map((status) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
              <h3 className="font-semibold text-gray-700 mb-3 text-center">
                {status.replace('_', ' ')}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-400 text-center">No tasks</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanPage;