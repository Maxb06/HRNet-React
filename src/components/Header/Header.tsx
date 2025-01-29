import styles from './Header.module.css';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="HRnet Logo" className={styles.logo} />
    </header>
  );
};

export default Header;
