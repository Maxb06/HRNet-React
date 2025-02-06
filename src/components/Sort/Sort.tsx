import styles from './Sort.module.css';

interface SortProps {
  column: string;
  label: string;
  sortConfig: { key: string | null; direction: 'ascending' | 'descending' };
  requestSort: (column: string) => void;
}

const Sort: React.FC<SortProps> = ({ column, label, sortConfig, requestSort }) => {
  const isSorted = sortConfig.key === column;
  const direction = isSorted ? sortConfig.direction : null;

  return (
    <th onClick={() => requestSort(column)} className={styles.sortable}>
      <div className={styles.sortContainer}>
        <span>{label}</span>
        <span className={styles.icons}>
          <span className={`${styles.arrow} ${direction === 'ascending' ? styles.active : ''}`}>▲</span>
          <span className={`${styles.arrow} ${direction === 'descending' ? styles.active : ''}`}>▼</span>
        </span>
      </div>
    </th>
  );
};

export default Sort;
