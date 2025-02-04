import { createContext } from 'react';

// Définition unique des types
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  startDate: string | null;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

export interface EmployeeState {
  employees: Employee[];
}

export type EmployeeAction =
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'DELETE_EMPLOYEE'; payload: string };

// Création du contexte
export const EmployeeContext = createContext<{
  state: EmployeeState;
  dispatch: React.Dispatch<EmployeeAction>;
} | undefined>(undefined);
