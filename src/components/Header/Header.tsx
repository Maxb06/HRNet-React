import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/"><img src={logo} alt="HRnet Logo" className={styles.logo} /></Link>
    </header>
  );
};

export default Header;
