import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import styles from './CreateEmployee.module.css';

const CreateEmployee = () => {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1>HRnet</h1>
        <Link to="/employee-list" className="button">View Current Employees</Link>
      </div>
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Create Employee</h2>
        <Form />
      </section>
    </main>
  );
};

export default CreateEmployee;
