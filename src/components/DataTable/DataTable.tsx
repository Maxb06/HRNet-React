import { useState, useEffect } from 'react';
import { useEmployeeContext } from '../../hooks/useEmployeeContext';
import Sort from '../Sort/Sort';
import styles from './DataTable.module.css';

const DataTable = () => {
  const { state, dispatch } = useEmployeeContext();

  // États
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(state.employees);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  useEffect(() => {
    let result = state.employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase()) ||
        employee.city.toLowerCase().includes(search.toLowerCase()) ||
        employee.state.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a] ?? '';
        const bValue = b[sortConfig.key as keyof typeof b] ?? '';

        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    setFilteredData(result);
  }, [search, state.employees, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  const requestSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const deleteEmployee = (id: string) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  };

  // Pagination
  const indexOfLastItem = currentPage * entries;
  const indexOfFirstItem = indexOfLastItem - entries;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / entries);

  return (
    <div className={styles.container}>
      {/* Barre de recherche et sélection d'entrées */}
      <div className={styles.header}>
        <div>
          <label>
            Show
            <select value={entries} onChange={(e) => setEntries(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{' '}
            entries
          </label>
        </div>
        <div>
          <label>Search:</label>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Tableau des employés */}
      <table className={styles.table}>
        <thead>
          <tr>
            <Sort column="firstName" label="First Name" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="lastName" label="Last Name" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="startDate" label="Start Date" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="department" label="Department" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="dateOfBirth" label="Date of Birth" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="street" label="Street" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="city" label="City" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="state" label="State" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="zipCode" label="Zip Code" sortConfig={sortConfig} requestSort={requestSort} />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{new Date(employee.startDate ?? '').toLocaleDateString()}</td>
                <td>{employee.department}</td>
                <td>{new Date(employee.dateOfBirth ?? '').toLocaleDateString()}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.state}</td>
                <td>{employee.zipCode}</td>
                <td>
                  <button onClick={() => deleteEmployee(employee.id)}>🗑</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.footer}>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
