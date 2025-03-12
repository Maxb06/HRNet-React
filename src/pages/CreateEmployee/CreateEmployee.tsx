import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import styles from './CreateEmployee.module.css';

const CreateEmployee = () => {
  return (
    <main className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>HRnet</h1>
        <Link to="/employee-list" className={styles.button}>View Current Employees</Link>
      </header>
      
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Create Employee</h2>
          <Form />
        </div>
      </section>
    </main>
  );
};

export default CreateEmployee;
