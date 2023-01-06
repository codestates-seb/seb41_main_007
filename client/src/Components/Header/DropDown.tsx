import React, { useEffect, useState } from 'react';
import './Styles/DropDown.css';

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
        <button
          onMouseDown={handleMouseDown}
          onClick={(): void => {
            console.log('Hi');
            TogglecloseHandler();
          }}
        >
          회원정보수정
        </button>
        <button
          onMouseDown={handleMouseDown}
          onClick={(): void => {
            console.log('Hi2');
            TogglecloseHandler();
          }}
        >
          주문조회
        </button>
        <button
          onMouseDown={handleMouseDown}
          onClick={(): void => {
            console.log('Hi2');
            TogglecloseHandler();
          }}
        >
          문의하기
        </button>
      </nav>
    </>
  );
};

export default DropDown;
