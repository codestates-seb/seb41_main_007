import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/Header.module.css';

const LoginRequiredButton: FC = () => {
  return (
    <div className={styles.Header_Button_Container}>
      <Link to="/login" className={styles.Header_Login_Button}>
        로그인
      </Link>
      <Link className={styles.Header_SignUp_Button} to="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default LoginRequiredButton;
