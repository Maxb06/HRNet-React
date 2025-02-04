import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerField.module.css';

interface DatePickerFieldProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, selected, onChange }) => {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <DatePicker
        selected={selected ?? null}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className={styles.customDatePicker}
        isClearable
      />
    </div>
  );
};

export default DatePickerField;
