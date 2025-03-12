import { createContext } from 'react';

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

export const EmployeeContext = createContext<{
  state: EmployeeState;
  dispatch: React.Dispatch<EmployeeAction>;
} | undefined>(undefined);
