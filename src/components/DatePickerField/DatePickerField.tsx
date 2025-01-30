import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerField.module.css';

interface DatePickerFieldProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, selected, onChange, error }) => {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className={styles.customDatePicker}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default DatePickerField;
