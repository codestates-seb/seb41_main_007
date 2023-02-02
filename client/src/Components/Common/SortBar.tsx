import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Styles/SortBar.module.css';
const SortBar: FC = () => {
  const nav = useNavigate();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const page = params.get('page');
  const [sort, setSort] = useState<any>(
    params.get('sort') ? params.get('sort') : 'productid',
  );
  const [order, setOrder] = useState<any>(
    params.get('order') ? params.get('order') : 'ascending',
  );
  const [size, setSize] = useState<any>(
    params.get('size') ? params.get('size') : '12',
  );

  const sortFunc = useCallback(() => {
    nav(`/products/all?sort=${sort}&order=${order}&page=${page}&size=${size}`, {
      replace: true,
    });
  }, [size, sort, order, page]);

  useEffect(() => {
    sortFunc();
  }, [sortFunc]);

  const sortSelect = (e: any) => {
    setSort(e.target.value);
  };
  const sizeSelect = (e: any) => {
    setSize(e.target.value);
  };
  const orderSelect = (e: any) => {
    setOrder(e.target.value);
  };

  return (
    <div className={styles.SortBar_Container}>
      <select
        className={styles.SortBar_Select}
        onChange={sortSelect}
        value={sort}
      >
        <option value={'productid'}>최신순</option>
        <option value={'rating'}> 인기순</option>
        <option value={'name'}> 이름순</option>
        <option value={'price'}>가격순</option>
      </select>
      <select
        className={styles.SortBar_Select}
        onChange={sizeSelect}
        value={size}
      >
        <option value={15}>15개</option>
        <option value={20}>20개</option>
        <option value={30}>30개</option>
      </select>
      <select
        className={styles.SortBar_Select}
        onChange={orderSelect}
        value={order}
      >
        <option value={'ascending'}>오름차순</option>
        <option value={'descending'}>내림차순</option>
      </select>
    </div>
  );
};

export default SortBar;
