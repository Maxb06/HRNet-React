import styles from './InputField.module.css';
interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange }) => {
    return (
      <div className={styles.inputField}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} value={value} onChange={onChange} />
      </div>
    );
  };
  
  export default InputField;
  