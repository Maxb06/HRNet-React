import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import styles from './EmployeeList.module.css';

const EmployeeList = () => {
  return (
    <main>
      <h1 className={styles.title}>Current Employees</h1>
      <DataTable />
      <Link to="/">Home</Link>
    </main>
  );
};

export default EmployeeList;
