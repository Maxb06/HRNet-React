import { useState } from 'react';
import { useEmployeeContext } from '../../hooks/useEmployeeContext';
import { STATES, DEPARTMENTS } from '../../data/constants';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import DatePickerField from '../DatePickerField/DatePickerField';
import Modal from '../Modal/Modal';
import styles from './Form.module.css';

const Form = () => {

  const { dispatch } = useEmployeeContext();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: STATES[0].name,
    zipCode: '',
    department: DEPARTMENTS[0],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (name: string, value: string | Date | null) => {
    setFormData({ ...formData, [name]: value });
  };

  const saveEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: 'ADD_EMPLOYEE',
      payload: {
        id: Date.now().toString(),
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : '',
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : '',
      },
    });

    setIsModalOpen(true);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: STATES[0].name,
      zipCode: '',
      department: DEPARTMENTS[0],
    });
  };

  return (
    <form className={styles.form} onSubmit={saveEmployee}>
      <div className={styles.formFieldOne}>
        <InputField
          label="First Name"
          id="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />

        <InputField
          label="Last Name"
          id="lastName" type="text"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />

        <DatePickerField
          label="Date of Birth"
          selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
          onChange={(date) => handleChange('dateOfBirth', date ? date.toISOString() : '')}
        />

        <DatePickerField
          label="Start Date"
          selected={formData.startDate ? new Date(formData.startDate) : null}
          onChange={(date) => handleChange('startDate', date ? date.toISOString() : '')}
        />
      </div>
      <div className={styles.formFieldTwo}>
        <fieldset className={styles.addressFieldset}>
          <legend className={styles.legend}>Address</legend>
          <InputField
            label="Street"
            id="street"
            type="text"
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
          />

          <InputField
            label="City"
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />

          <SelectField
            label="State"
            id="state"
            options={STATES.map(s => s.name)}
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />

          <InputField
            label="Zip Code"
            id="zipCode"
            type="number"
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
          />
        </fieldset>
      </div>
      <div className={styles.formFieldThree}>
        <SelectField
          label="Department"
          id="department"
          options={DEPARTMENTS}
          value={formData.department}
          onChange={(e) => handleChange('department', e.target.value)}
        />

        <button type="submit" className={styles.button}>Save</button>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p className={styles.modalText}>Employee Created!</p>
          </Modal>
        )}
      </div>
    </form>
  );
};

export default Form;
