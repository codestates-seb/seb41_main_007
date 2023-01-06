import React, { useState } from 'react';
import DropDown from './DropDown';
import './Styles/DropDown.css';

const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  return (
    <>
      <div className="Header_DropDown_Container">
        <button
          className={showDropDown ? 'active' : 'nonactive'}
          onClick={(): void => toggleDropDown()}
          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            dismissHandler(e)
          }
        >
          test 님
        </button>
        <button onClick={(): void => toggleDropDown()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#b6b6b6"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </button>
      </div>
      <div className="Header_DropDownList_Container">
        {showDropDown && (
          <DropDown
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
          />
        )}
      </div>
    </>
  );
};

export default Menu;
