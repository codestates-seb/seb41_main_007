import { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import LoginRequiredButton from './LoginRequiredButton';
import LoggedInButton from './LoggedInButton';
import Input from './Input';
import styles from './Styles/Header.module.css';

const Header: FC = () => {
  let isUser = true;
  return (
    <header>
      <div className={styles.Header_Container}>
        <div className={styles.Header_Contents_Container}>
          <Input />
          <div className={styles.Header_Logo_Container}>
            <Link to="/">
              <Logo width={230} height={230} />
            </Link>
          </div>
          {isUser ? <LoggedInButton /> : <LoginRequiredButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
