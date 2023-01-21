import { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Input from './Input';
import styles from './Styles/Header.module.css';
import TopColRight from './TopColRight';
import MobileHeader from './MobileHeader';

const Header: FC = () => {
  return (
    <header>
      <div className={styles.Header_Container}>
        <MobileHeader />
        <div className={styles.Header_Contents_Container}>
          <Input />
          <div className={styles.Header_Logo_Container}>
            <Link to="/">
              <Logo width={230} height={230} />
            </Link>
          </div>
          <TopColRight />
        </div>
      </div>
    </header>
  );
};

export default Header;
