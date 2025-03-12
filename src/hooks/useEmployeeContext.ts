import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
