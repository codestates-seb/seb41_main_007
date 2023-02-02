import { FC } from 'react';
import BasketTd from './BasketTd';
import PathCounter from './PathCounter';

interface checkBoxtype {
  handleSingleCheck: (checked: boolean, id: number) => void;
  checkItems: number[];
}
const Basket: FC<checkBoxtype> = ({ handleSingleCheck, checkItems }) => {
  const jsondata: string | null = localStorage.getItem('baskets');
  const baskets = JSON.parse(jsondata || '[]');

  if (baskets.length === 0) return <></>;

  return (
    <tbody>
      {baskets.map((el: any) => (
        <tr key={el.productOptionResponseDtos.productOptionId}>
          <PathCounter
            el={el}
            handleSingleCheck={handleSingleCheck}
            checkItems={checkItems}
          ></PathCounter>
        </tr>
      ))}
    </tbody>
  );
};

export default Basket;
