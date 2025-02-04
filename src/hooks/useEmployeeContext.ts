import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

// Hook personnalisé pour accéder au contexte
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
