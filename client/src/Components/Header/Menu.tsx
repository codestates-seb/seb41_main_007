import React, { useState } from 'react';
import DropDown from './DropDown';
import HambergerIcon from './Icon/HambergerIcon';

import styles from './Styles/DropDown.module.css';

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
    <div>
      <div className={styles.Header_DropDown_Container}>
        <button
          onClick={(): void => toggleDropDown()}
          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            dismissHandler(e)
          }
        >
          <HambergerIcon />
        </button>
      </div>
      <div className={styles.Header_DropDownList_Container}>
        {showDropDown && (
          <DropDown
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
