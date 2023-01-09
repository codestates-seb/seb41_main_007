import React, { useEffect, useState } from 'react';
import PersonIcon from './Icon/PersonIcon';
import { Link } from 'react-router-dom';
import SubmitIcon from './Icon/SubmitIcon';
import ContactIcon from './Icon/ContactIcon';

import styles from './Styles/DropDown.module.css';

type DropDownProps = {
  showDropDown: boolean;
  toggleDropDown: () => void;
};

const DropDown: React.FC<DropDownProps> = ({
  toggleDropDown,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  const TogglecloseHandler = () => {
    toggleDropDown();
  };

  const handleMouseDown = (e: React.MouseEvent) => e.preventDefault();

  return (
    <>
      <nav className={styles.dropdown}>
        <Link
          to="/mypage/edit"
          className={styles.Drop_Down_Button_Container}
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
        >
          <PersonIcon />
          <p className={styles.Drop_Down_Text}>회원정보</p>
        </Link>
        <Link
          to="/mypage"
          className={styles.Drop_Down_Button_Container}
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
        >
          <SubmitIcon />
          <p className={styles.Drop_Down_Text}>주문조회</p>
        </Link>

        <Link
          to="/questions"
          className={styles.Drop_Down_Button_Container}
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
        >
          <ContactIcon />
          <p className={styles.Drop_Down_Text}>문의하기</p>
        </Link>
      </nav>
    </>
  );
};

export default DropDown;
