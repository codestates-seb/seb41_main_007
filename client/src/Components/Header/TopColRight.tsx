import React, { FC, useEffect, useState } from 'react';
import styles from './Styles/TopColRight.module.css';
import { Link } from 'react-router-dom';
import BasketIcon from './Icon/BaskectIcon';
import ShopingCartIcon from './Icon/ShopingCartIcon';
import { useSession } from 'CustomHook/useSession';
import { selectprice, Pricestate, countset } from 'Redux/reducer/priceSlice';
import { useAppSelector, useAppDispatch } from 'Redux/app/hook';
import { TYPE_LocalOption, TYPE_CartData } from 'Types/common/product';
import useBooleanInput from 'CustomHook/useBooleaninput';

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
        <a href="#!" rel="noreferrer">
          회사소개
        </a>
      </li>
    </ul>
  );
};

const TopColRight: FC = () => {
  const resultarr: Pricestate[] = useAppSelector(selectprice);
  const { session, loading } = useSession();
  const [isOk, onisOk] = useBooleanInput(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const jsondataCounter: string | null =
      localStorage.getItem('basketsCounter');
    const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];

    basketsCounter.forEach((element: TYPE_LocalOption) => {
      const dispatchdata = {
        id: element.productOptionId,
        price: element.optionprice + element.price,
        count: element.count,
      };
      dispatch(countset(dispatchdata));
    });
  }, []);
  if (loading) return <></>;
  if (isOk && session) {
    //유즈이펙트 때문이었습니다.
    const jsondataCounter: string | null =
      localStorage.getItem('basketsCounter');
    const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];

    fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session}`,
      },
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res: TYPE_CartData[]) => {
        const optionIdData = res.map((getdata) => {
          return getdata.productOptionId;
        });
        const Filtered = basketsCounter.filter(
          (localData: TYPE_LocalOption) => {
            return !optionIdData.includes(localData.productOptionId);
          },
        );
        Filtered.forEach((element: TYPE_LocalOption) => {
          const suggest = {
            productOptionId: element.productOptionId,
            quantity: element.count,
          };
          fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
            body: JSON.stringify(suggest),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session}`,
            },
            method: 'POST',
          }).then((response) => console.log(response));
        });
      });

    //한번만 돌게하는 로직

    onisOk();
  }

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
//로그인시 오류
//배열객체 헷갈림 타입 잘확인할것
//타입을 정해야 더 편하게짬
