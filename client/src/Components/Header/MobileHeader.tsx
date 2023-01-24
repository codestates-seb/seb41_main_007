import { FC } from 'react';
import styles from './Styles/MobileHeader.module.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Menu from './Menu';
import Input from './Input';

const MobileHeader: FC = () => {
  return (
    <div className={styles.MobileHeader_Container}>
      <div className={styles.MobileHeader_Contents_Container}>
        <Input />
        <div className={styles.Mobile_Header_Logo_Container}>
          <Link to="/">
            <Logo width={150} height={150} />
          </Link>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default MobileHeader;
