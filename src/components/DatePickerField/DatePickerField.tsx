import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerField.module.css';
import { FaCalendarAlt } from 'react-icons/fa';

interface DatePickerFieldProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, selected, onChange }) => {
  const id = `datepicker-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrapper}>
        <DatePicker
          id={id}
          selected={selected ?? null}
          onChange={onChange}
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className={styles.customDatePicker}
          isClearable
        />
        <FaCalendarAlt className={styles.calendarIcon} />
      </div>
    </div>
  );
};

export default DatePickerField;
