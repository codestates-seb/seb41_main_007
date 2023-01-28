import React, { FC, useEffect, useState } from 'react';
import styles from './Styles/TopColRight.module.css';
import { Link } from 'react-router-dom';
import BasketIcon from './Icon/BaskectIcon';
import ShopingCartIcon from './Icon/ShopingCartIcon';
import { useSession } from 'CustomHook/useSession';
import { selectprice, Pricestate, countset } from 'Redux/reducer/priceSlice';
import { useAppSelector, useAppDispatch } from 'Redux/app/hook';
import { counttype } from 'Types/common/product';
import { useQuery } from 'react-query';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

const Logined = () => {
  console.log('로그인');
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

  // const [loginBasket, setloginBasket] = useState([]);
  // const { data, isLoading, error, status, refetch } = useQuery(
  //   'basket',
  //   () => {
  //     return fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${session}`,
  //       },
  //     })
  //       .then((res: Response) => {
  //         return res.json();
  //       })
  //       .then((res: []) => {
  //         console.log(res);
  //         setloginBasket(res);
  //         console.log('하이');
  //       });
  //   },
  //   { keepPreviousData: true },
  // );

  // if (loading) return <></>;
  // if (isLoading) return <></>;
  // if (error) return <></>;
  // console.log(data);

  // console.log('쿼리~');
  // fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${session}`,
  //   },
  // })
  //   .then((res: Response) => {
  //     return res.json();
  //   })
  //   .then((res: Response[]) => {
  //     console.log(res);
  //   });

  // const dispatch = useAppDispatch();
  // const [firstCheck, onfirstCheck] = useBooleanInput(true);
  // const jsondata: string | null = localStorage.getItem('baskets');
  // const baskets = JSON.parse(jsondata || '[]') || [];
  // const jsondataCounter: string | null = localStorage.getItem('basketsCounter');
  // const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];
  // if (session && firstCheck) {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${session}`,
  //     },
  //   })
  //     .then((res: Response) => {
  //       return res.json();
  //     })
  //     .then((res: Response[]) => {ddd
  //       console.log(res);
  //       if (res) {
  //         res.forEach((element: any) => {
  //           const dispatchdata = {
  //             id: element.productId,
  //             price: element.productOptionPrice + element.productPrice,
  //             count: element.quantity,
  //           };
  //           dispatch(countset(dispatchdata));
  //           const datacount: counttype = {
  //             id: element.productId,
  //             price: element.productPrice,
  //             optionprice: element.productOptionPrice,
  //             optionname: element.productOptionName,
  //             productOptionId: element.productOptionId,
  //             count: element.quantity,
  //           };
  //           basketsCounter.push(datacount);
  //           localStorage.setItem(
  //             'basketsCounter',
  //             JSON.stringify(basketsCounter),
  //           );

  //           fetch(
  //             `${process.env.REACT_APP_BACKEND_URL}/products/${element.productId}`,
  //             {
  //               method: 'GET',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 Authorization: `Bearer ${session}`,
  //               },
  //             },
  //           )
  //             .then((res: Response) => {
  //               return res.json();
  //             })
  //             .then((res) => {
  //               console.log(res);
  //               baskets.push(res);
  //               localStorage.setItem('baskets', JSON.stringify(baskets));
  //             });
  //         });
  //       }
  //     })
  //     .then(() => {
  //       console.log(firstCheck);
  //       onfirstCheck();
  //     });
  // }

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
