import React, { FC } from 'react';
import styles from './Styles/TopColRight.module.css';
import { Link } from 'react-router-dom';
const TopColRight: FC = () => {
  const logoutHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };
  return (
    <div className={styles.Nav_All_Container}>
      <ul className={styles.Nav_Container1}>
        <Link to="/mypage">
          <li className={styles.Nav_Menu1}>내정보</li>
        </Link>
        <li className={styles.Nav_Menu1}> |</li>
        <button onClick={logoutHandler}>
          <li className={styles.Nav_Menu1}>로그아웃</li>
        </button>
      </ul>
      <ul className={styles.Nav_Container2}>
        <Link to="/products/1">
          <li className={styles.Nav_Menu2}>상품보기</li>
        </Link>
        <Link to="/basket">
          <li className={styles.Nav_Menu2}>장바구니</li>
        </Link>
      </ul>
    </div>
  );
};

export default TopColRight;
