import React, { useEffect, useState } from 'react';
import './Styles/DropDown.css';
import PersonIcon from './PersonIcon';
import { Link } from 'react-router-dom';
import SubmitIcon from './SubmitIcon';
import ContactIcon from './ContactIcon';

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

  const handleMouseDown = (e: any) => e.preventDefault();

  return (
    <>
      <nav className={showDropDown ? 'dropdown' : 'dropdown active'}>
        <Link
          to="/mypage/edit"
          className="Drop_Down_Button_Container"
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
        >
          <PersonIcon />
          <p className="Drop_Down_Text">회원정보</p>
        </Link>

        <Link
          to="/mypage"
          className="Drop_Down_Button_Container"
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
        >
          <SubmitIcon />
          <p className="Drop_Down_Text">주문조회</p>
        </Link>

        <Link
          to="/questions"
          className="Drop_Down_Button_Container"
          onMouseDown={handleMouseDown}
          onClick={(): void => TogglecloseHandler()}
        >
          <ContactIcon />
          <p className="Drop_Down_Text">문의하기</p>
        </Link>
      </nav>
    </>
  );
};

export default DropDown;
