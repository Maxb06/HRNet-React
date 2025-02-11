import React, { useReducer } from 'react';
import { EmployeeContext, EmployeeState, EmployeeAction } from './EmployeeContext';

// Init de l'état
const initialState: EmployeeState = { employees: [] };

// Reducer
const employeeReducer = (state: EmployeeState, action: EmployeeAction): EmployeeState => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return { employees: [...state.employees, action.payload] };
    default:
      return state;
  }
};


// Provider avec gestion de l’état
export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
