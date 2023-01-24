import React, { FC } from 'react';
import styles from './Styles/TopColRight.module.css';
import { Link } from 'react-router-dom';
import BasketIcon from './Icon/BaskectIcon';
import ShopingCartIcon from './Icon/ShopingCartIcon';

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
        <Link
          to="/products/all?sort=likeCount&order=ascending&page=1&size=20"
          style={{ display: 'flex', gap: '6px' }}
        >
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

export default TopColRight;
