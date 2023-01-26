import React, { FC, useEffect, useState } from 'react';
import styles from './Styles/TopColRight.module.css';
import { Link } from 'react-router-dom';
import BasketIcon from './Icon/BaskectIcon';
import ShopingCartIcon from './Icon/ShopingCartIcon';
import { useSession } from 'CustomHook/useSession';
import { selectprice, Pricestate } from 'Redux/reducer/priceSlice';
import { useAppSelector } from 'Redux/app/hook';

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

      <li className={styles.Nav_Menu1}>
        <a
          href="https://github.com/codestates-seb/seb41_main_007"
          target="_blank"
          rel="noreferrer"
        >
          회사소개
        </a>
      </li>
    </ul>
  );
};

const TopColRight: FC = () => {
  const { session, loading } = useSession();
  const resultarr: Pricestate[] = useAppSelector(selectprice);
  if (loading) return <></>;

  return (
    <div className={styles.Nav_All_Container}>
      {session ? <Logined /> : <LoginRequired />}
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
          {resultarr.length > 0 ? (
            <span className={styles.Nav_Basket}>{resultarr.length} </span>
          ) : (
            ''
          )}
        </Link>
      </ul>
    </div>
  );
};

export default TopColRight;
//바로 값이 반영되고자 usestate 값을사용
//use state effect 사용했으나 실패
