import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { useEmployeeContext } from '../../hooks/useEmployeeContext';
import styles from './DataTable.module.css';

interface Employee {
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

const DataTable = () => {
  const { state } = useEmployeeContext();

  // états pour la recherche et le nombre d'entrées affichées
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);

  // Filtre des données selon la recherche
  const filteredData = useMemo(() => {
    return state.employees.filter((emp) =>
      Object.values(emp).some((val) =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, state.employees]);

  // colonnes
  const columns: ColumnDef<Employee>[] = useMemo(
    () => [
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        cell: ({ getValue }) => {
          const dateValue = getValue<string>();
          return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
        },
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ getValue }) => {
          const dateValue = getValue<string>();
          return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
        },
      },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'street', header: 'Street' },
      { accessorKey: 'city', header: 'City' },
      { accessorKey: 'state', header: 'State' },
      { accessorKey: 'zipCode', header: 'Zip Code' },
    ],
    []
  );

  // Creation tableau react-table
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: entries,
      },
    },
  });

  return (
    <div className={styles.container}>
      {/* Header du tableau */}
      <div className={styles.header}>
        <div>
          <label>
            Show
            <select
              value={entries}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
                setEntries(Number(e.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{' '}
            entries
          </label>
        </div>

        <div>
          <label>
            Search:{' '}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Tableau */}
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()} className={styles.sortable}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <span>{header.column.getIsSorted() === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className={styles.footer}>
        <div>
          Showing {table.getState().pagination.pageIndex * entries + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * entries,
            filteredData.length
          )}{' '}
          of {filteredData.length} entries
        </div>

        <div className={styles.pagination}>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </button>

          {/*  numéros de pages */}
          {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={table.getState().pagination.pageIndex === pageIndex ? styles.activePage : ''}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default DataTable;
