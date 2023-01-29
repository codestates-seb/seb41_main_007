import { FC } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import styles from './Styles/Header.module.css';
import TopColRight from './TopColRight';
import MobileHeader from './MobileHeader';
import TinyMobileHeader from './TinyMobileHeader';

const Header: FC = () => {
  return (
    <header>
      <div className={styles.Header_Container}>
        <TinyMobileHeader />
        <MobileHeader />
        <div className={styles.Header_Contents_Container}>
          <Input />
          <div className={styles.Header_Logo_Container}>
            <Link to="/">
              <img
                width={230}
                height={100}
                src={'/image/FarmPi.svg'}
                alt="LOGO"
              />
            </Link>
          </div>
          <TopColRight />
        </div>
      </div>
    </header>
  );
};

export default Header;
