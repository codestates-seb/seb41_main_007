import { FC } from 'react';
import styles from './Styles/MobileHeader.module.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Input from './Input';

const MobileHeader: FC = () => {
  return (
    <div className={styles.MobileHeader_Container}>
      <div className={styles.MobileHeader_Contents_Container}>
        <Input />
        <div className={styles.Mobile_Header_Logo_Container}>
          <Link to="/">
            <img width={150} height={80} src={'/image/FarmPi.svg'} alt="LOGO" />
          </Link>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default MobileHeader;
