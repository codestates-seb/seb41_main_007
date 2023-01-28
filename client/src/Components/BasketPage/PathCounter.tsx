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
    return (
      data.productOptionId === el.productOptionResponseDtos.productOptionId
    );
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
//옵션 인식 문제 해결
// 옵션 각각 들어가지 않음
//옵션 이름 문제
//옵션 가격 책정
//옵션 가격 넣기
