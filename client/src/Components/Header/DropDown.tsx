import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from './Icon/PersonIcon';

import styles from './Styles/DropDown.module.css';
import BasketIcon from './Icon/BaskectIcon';
import ShopingCartIcon from './Icon/ShopingCartIcon';
import LogoutIcon from './Icon/LogoutIcon';
import { useSession } from 'CustomHook/useSession';

type DropDownProps = {
  showDropDown: boolean;
  toggleDropDown: () => void;
};

const DropDown: React.FC<DropDownProps> = ({
  toggleDropDown,
}: DropDownProps): JSX.Element => {
  const { session, loading } = useSession();
  if (loading) return <></>;

  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  const TogglecloseHandler = () => {
    toggleDropDown();
  };

  const handleMouseDown = (e: React.MouseEvent) => e.preventDefault();

  const logoutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };

  return (
    <>
      <nav className={styles.dropdown}>
        <Link
          to="/products/all?sort=likeCount&order=ascending&page=1&size=20"
          className={styles.Drop_Down_Button_Container}
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
          style={{ display: 'flex', gap: '6px' }}
        >
          <ShopingCartIcon />
          <p className={styles.Drop_Down_Text}>상품보기</p>
        </Link>
        <Link
          to="/basket"
          className={styles.Drop_Down_Button_Container}
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
          style={{ display: 'flex', gap: '6px' }}
        >
          <BasketIcon />
          <p className={styles.Drop_Down_Text}>장바구니</p>
        </Link>
        {session ? (
          <>
            <Link
              to="/mypage"
              className={styles.Drop_Down_Button_Container}
              onMouseDown={handleMouseDown}
              onClick={(): void => TogglecloseHandler()}
              style={{ display: 'flex', gap: '6px' }}
            >
              <PersonIcon />
              <p className={styles.Drop_Down_Text}>내정보</p>
            </Link>
            <button
              onClick={logoutHandler}
              onMouseDown={handleMouseDown}
              className={styles.Drop_Down_Button_Container}
              style={{ display: 'flex', gap: '6px' }}
            >
              <LogoutIcon />
              <p className={styles.Drop_Down_Text}> 로그아웃</p>
            </button>
          </>
        ) : (
          <>
            <Link
              to={'/login'}
              onMouseDown={handleMouseDown}
              className={styles.Drop_Down_Button_Container}
              style={{ display: 'flex', gap: '6px' }}
            >
              <LogoutIcon />
              <p className={styles.Drop_Down_Text}> 로그인</p>
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default DropDown;
