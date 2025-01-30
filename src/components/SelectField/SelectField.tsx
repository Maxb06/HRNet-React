import styles from './SelectField.module.css';

interface SelectFieldProps {
    label: string;
    id: string;
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
  const SelectField: React.FC<SelectFieldProps> = ({ label, id, options, value, onChange }) => {
    return (
      <div className={styles.selectField}>
        <label htmlFor={id}>{label}</label>
        <select id={id} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectField;
  