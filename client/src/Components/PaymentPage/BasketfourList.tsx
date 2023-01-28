import { FC } from 'react';
import Basketfour from './Basketfour';
import { TYPE_CartData } from 'Types/common/product';

const BasketfourList: FC<{ data: TYPE_CartData[] }> = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((el: any) => (
        <Basketfour key={el.productOptionId} data={el}></Basketfour>
      ))}
    </div>
  );
};

export default BasketfourList;
