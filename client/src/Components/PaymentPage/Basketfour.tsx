import { TYPE_CartData } from 'Types/common/product';
import React from 'react';
import { useNumberComma } from 'Utils/commonFunction';
import styled from 'styled-components';

interface Props {
  data: TYPE_CartData;
}

const Z_indx = styled.div`
  position: abo;
  top: 0;
`;

const BasketFour: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-5 relative  h-32 w-12/12">
      <div>
        <img
          className="absolute top-0 left-0 w-28 h-28"
          src={data.photo}
          alt="carousel"
        ></img>

        <div className=" pl-36 h-28 w-full table-cell align-middle">
          <div>
            <div className="font-semibold ">{data.productName}</div>
            <div className="text-sm mt-1 text-gray-500">
              {' '}
              {data.productOptionName}
            </div>
          </div>
          <p className="absolute z-20 w-56 top-12 right-0 text-right text-gray-500">
            {data.quantity}개
            <strong className="w-36 inline-block">
              {useNumberComma(
                (data.productPrice + data.productOptionPrice) * data.quantity,
              )}
              <span>원</span>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasketFour;
//무너지는거 수정할것
//결제페이지 밀림 현사 ㅇ해결할것
