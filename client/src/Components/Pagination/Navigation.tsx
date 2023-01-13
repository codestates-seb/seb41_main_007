import { useState } from 'react';
import styles from './Styles/Nav.module.css';
import classNames from 'classnames/bind';
const cb = classNames.bind(styles);

const Navigation = ({
  totalPage,
  currentPage,
  callbackFunc,
}: {
  totalPage: number;
  currentPage: number;
  callbackFunc: (page: number) => void;
}) => {
  const PageArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [pageStage, setPageStage] = useState<number>(
    Math.ceil(currentPage / 10) - 1,
  );
  function isPrev() {
    if (pageStage > 0) {
      return false;
    } else {
      return true;
    }
  }
  function isNext() {
    if (pageStage < Math.ceil(totalPage / 10) - 1) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className={styles.Nav_Container}>
      <button
        className={cb('Nav_Button', { Nav_Button_Disabled: isPrev() })}
        style={{ marginRight: 10 }}
        onClick={() => setPageStage(0)}
      >
        {'<<'}
      </button>
      <button
        className={cb('Nav_Button', { Nav_Button_Disabled: isPrev() })}
        style={{ marginRight: 10 }}
        onClick={() => setPageStage((prev) => (prev = prev - 1))}
      >
        {'<'}
      </button>
      {PageArray.map((item) => (
        <button
          key={item}
          className={cb('Nav_Item', {
            Nav_Item_Disabled: pageStage * 10 + item > totalPage,
            Nav_Item_Selected: pageStage * 10 + item === currentPage,
          })}
          onClick={() => callbackFunc(pageStage * 10 + item)}
        >
          {pageStage * 10 + item}
        </button>
      ))}
      <button
        className={cb('Nav_Button', { Nav_Button_Disabled: isNext() })}
        style={{ marginLeft: 10 }}
        onClick={() => setPageStage((prev) => (prev = prev + 1))}
      >
        {'>'}
      </button>
      <button
        className={cb('Nav_Button', { Nav_Button_Disabled: isNext() })}
        style={{ marginLeft: 10 }}
        onClick={() => setPageStage(Math.ceil(totalPage / 10) - 1)}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Navigation;
