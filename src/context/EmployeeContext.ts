import { createContext } from 'react';

// Définition unique des types
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
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

// Création du contexte
export const EmployeeContext = createContext<{
  state: EmployeeState;
  dispatch: React.Dispatch<EmployeeAction>;
} | undefined>(undefined);
