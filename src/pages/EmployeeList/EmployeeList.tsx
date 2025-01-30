import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteEmployee } from '../../store/employeesSlice';

const EmployeeList = () => {
  const employees = useSelector((state: RootState) => state.employees.employees);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Current Employees</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee.firstName} {employee.lastName} - {employee.department}
            <button onClick={() => dispatch(deleteEmployee(index))}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
