import { FC } from 'react';
import BasketTd from './BasketTd';
import { useAppSelector } from 'Redux/app/hook';
import { selectprice, Pricestate } from 'Redux/reducer/priceSlice';

interface checkBoxtype {
  el: any;
  handleSingleCheck: (checked: boolean, id: number) => void;
  checkItems: number[];
}

const PathCounter: FC<checkBoxtype> = ({
  handleSingleCheck,
  checkItems,
  el,
}) => {
  const jsondata: string | null = localStorage.getItem('basketsCounter');
  const resultarr = JSON.parse(jsondata || '[]') || [];
  console.log(resultarr);
  let countnumber = 1;
  //   const itemDetail = resultarr.filter((item: any) => {
  //     return item.id === el.productId;
  //   });
  if (resultarr.length > 0) {
    resultarr.forEach((data: any) => {
      console.log(el.productId);
      if (data.id === el.productId) {
        countnumber = data.count;
        console.log(data.count);
        console.log('바뀜');
      }
    });
  }
  console.log(countnumber);

  return (
    <>
      <BasketTd
        el={el}
        handleSingleCheck={handleSingleCheck}
        checkItems={checkItems}
        countNumber={countnumber}
      ></BasketTd>
    </>
  );
};

export default PathCounter;
