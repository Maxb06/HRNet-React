import { useEmployeeContext } from '../../hooks/useEmployeeContext';
import { Link } from 'react-router-dom';
import styles from './EmployeeList.module.css';
import { EasyTableV2, ColumnDef } from 'easyv2-table';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const EmployeeList = () => {
  const { state } = useEmployeeContext();
  
  const columns: ColumnDef<Employee>[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      render: (val) => {
        if (!val) return "";
        const d = new Date(val as string);
        return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
      }
    },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (val) => {
        if (!val) return "";
        const d = new Date(val as string);
        return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
      }
    },
    { key: 'department', label: 'Department' },
    { key: 'street', label: 'Street' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'Zip Code' },
  ];

  return (
    <main>
      <h1 className={styles.title}>Current Employees</h1>
      
      <EasyTableV2
        data={state.employees}
        columns={columns}
        pagination 
        itemsPerPage={10}
        search  
      />

      <div className={styles.link}>
        <Link to="/">Home</Link>
      </div>
    </main>
  );
};

export default EmployeeList;
