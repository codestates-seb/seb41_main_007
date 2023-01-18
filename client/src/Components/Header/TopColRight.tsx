import React, { FC } from 'react';
import styles from './Styles/TopColRight.module.css';
import { Link } from 'react-router-dom';

const Logined = () => {
  const logoutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };
  return (
    <ul className={styles.Nav_Container1}>
      <Link to="/mypage">
        <li className={styles.Nav_Menu1}>내정보</li>
      </Link>
      <li className={styles.Nav_Menu1}> |</li>
      <button onClick={logoutHandler}>
        <li className={styles.Nav_Menu1}>로그아웃</li>
      </button>
    </ul>
  );
};

const LoginRequired = () => {
  return (
    <ul className={styles.Nav_Container1}>
      <Link to="/login">
        <li className={styles.Nav_Menu1}>로그인</li>
      </Link>
      <li className={styles.Nav_Menu1}> |</li>
      <Link to="/signup">
        <li className={styles.Nav_Menu1}>회원가입</li>
      </Link>
    </ul>
  );
};

const TopColRight: FC = () => {
  let isUser = true;
  return (
    <div className={styles.Nav_All_Container}>
      {isUser ? <Logined /> : <LoginRequired />}
      <ul className={styles.Nav_Container2}>
        <Link to="/products/1" style={{ display: 'flex', gap: '6px' }}>
          <ShopingCartIcon />
          <li className={styles.Nav_Menu2}>상품보기</li>
        </Link>
        <Link to="/basket" style={{ display: 'flex', gap: '6px' }}>
          <BasketIcon />
          <li className={styles.Nav_Menu2}>장바구니</li>
        </Link>
      </ul>
    </div>
  );
};

const ShopingCartIcon = () => {
  return (
    <div style={{ paddingTop: '5px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20}>
        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
      </svg>
    </div>
  );
};

const BasketIcon: FC = () => {
  return (
    <div style={{ paddingTop: '4px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20}>
        <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
      </svg>
    </div>
  );
};

export default TopColRight;
