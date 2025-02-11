import { useMemo } from 'react';
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
  city: string;
  state: string;
  zipCode: string;
}

const DataTable = () => {
  const { state } = useEmployeeContext();
  const data: Employee[] = useMemo(() => state.employees, [state.employees]);

  // Définition des colonnes
  const columns: ColumnDef<Employee>[] = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        cell: ({ getValue }) => {
          const dateValue = getValue<string>();
          return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
        }
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ getValue }) => {
          const dateValue = getValue<string>();
          return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
        }
      },
      {
        accessorKey: 'department',
        header: 'Department',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code',
      },
    ],
    []
  );

  // Création du tableau avec React Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles.container}>
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

      {/* Pagination */}
      <div className={styles.footer}>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
