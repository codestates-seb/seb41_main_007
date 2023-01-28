import { FC } from 'react';
import Basketfour from './Basketfour';
//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움

const BasketfourList = () => {
  const jsondata: string | null = localStorage.getItem('baskets');

  const baskets = JSON.parse(jsondata || '[]');

  if (baskets.length === 0) return <></>;

  return (
    <tbody>
      {/* {baskets.map((el: any) => (
        <> key={el.productId}></>
      ))} */}
    </tbody>
  );
};

export default BasketfourList;
