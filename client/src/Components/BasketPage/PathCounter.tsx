import { FC } from 'react';
import BasketTd from './BasketTd';

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

  //   const itemDetail = resultarr.filter((item: any) => {
  //     return item.id === el.productId;
  //   });
  const OptionData = resultarr.filter((data: any) => {
    return data.id === el.productId;
  });

  console.log(OptionData);
  console.log('안녕');
  // resultarr.forEach((data: any) => {
  //   console.log(el.productId);
  //   if (data.id === el.productId) {
  //     countnumber = data.count;
  //   }
  // });

  // console.log(countnumber);

  return (
    <>
      <BasketTd
        el={el}
        handleSingleCheck={handleSingleCheck}
        checkItems={checkItems}
        // countNumber={countnumber}
        OptionData={OptionData[0]}
      ></BasketTd>
    </>
  );
};

export default PathCounter;
//배열 객체 혼동했음
