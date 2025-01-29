import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
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

interface EmployeesState {
  employees: Employee[];
}

const initialState: EmployeesState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees.splice(action.payload, 1);
    },
  },
});

export const { addEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
