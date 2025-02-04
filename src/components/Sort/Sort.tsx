import styles from './Sort.module.css';

interface SortableHeaderProps {
  column: string;
  label: string;
  sortConfig: { key: string | null; direction: string };
  requestSort: (key: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label, sortConfig, requestSort }) => {
  const isSorted = sortConfig.key === column;

  return (
    <th onClick={() => requestSort(column)} className={styles.sortable}>
      <div>
        <span>{label}</span>
        <span className={styles.arrow}>
          {isSorted ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
        </span>
      </div>
    </th>
  );
};

export default SortableHeader;