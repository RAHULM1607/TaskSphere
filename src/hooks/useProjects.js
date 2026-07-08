import { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';

/**
 * Custom hook to access project context
 * @returns {Object} Project context value
 * @throws {Error} If used outside of ProjectProvider
 */
export const useProjects = () => {
  const context = useContext(ProjectContext);
  
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  
  return context;
};

export default useProjects;