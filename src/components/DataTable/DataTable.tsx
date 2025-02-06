import { useState, useEffect } from 'react';
import { useEmployeeContext } from '../../hooks/useEmployeeContext';
import Sort from '../Sort/Sort';
import styles from './DataTable.module.css';

const DataTable = () => {
  const { state, dispatch } = useEmployeeContext();
  const employees = state.employees;

  // États
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(employees);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  // Mise à jour des données filtrées et triées
  useEffect(() => {
    let result = employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase()) ||
        emp.city.toLowerCase().includes(search.toLowerCase()) ||
        emp.state.toLowerCase().includes(search.toLowerCase())
    );

    // Tri si une colonne est sélectionnée
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
  }, [search, employees, sortConfig]);

  // Mise à jour pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  // Fonction de tri
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
      {/* Barre de recherche & sélection d'entrées */}
      <div className={styles.header}>
        <label>
          Show
          <select value={entries} onChange={(e) => setEntries(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{' '}
          entries
        </label>

        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Tableau */}
      <table className={styles.table}>
        <thead>
          <tr>
            <Sort column="firstName" label="First Name" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="lastName" label="Last Name" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="dateOfBirth" label="Date of Birth" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="startDate" label="Start Date" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="department" label="Department" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="city" label="City" sortConfig={sortConfig} requestSort={requestSort} />
            <Sort column="state" label="State" sortConfig={sortConfig} requestSort={requestSort} />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{new Date(emp.dateOfBirth ?? '').toLocaleDateString()}</td>
                <td>{new Date(emp.startDate ?? '').toLocaleDateString()}</td>
                <td>{emp.department}</td>    
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp.id)}>🗑</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.footer}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </button>

        <span>{currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => prev < totalPages ? prev + 1 : prev)}
          disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
