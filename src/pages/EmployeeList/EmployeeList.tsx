import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';

const EmployeeList = () => {
  return (
    <div>
      <h1>Current Employees</h1>
      <DataTable />
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
