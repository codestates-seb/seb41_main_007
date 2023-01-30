import styled from 'styled-components';
import CheckBox from 'Components/Common/CheckBox';
import { TYPE_CartData, TYPE_KakaoApi } from 'Types/common/product';
import { useState } from 'react';
type ProductData = { productOptionId: number; quantity: number };
const Agree = styled.div``;
const TotalContainer = styled.div`
  margin-top: 220px;
  margin-left: 40px;
  border-top: 2px solid black;
  position: sticky;
  top: 15%;
  .container {
    width: 360px;
    height: 360px;
  }
  .title {
    border-bottom: 1px solid var(--gray-20);
  }
`;
const Pay = styled.div`
  border-bottom: 1px solid var(--gray-20);
`;

const Totalpay: React.FC<{ data: TYPE_CartData[] }> = ({ data }) => {
  const [orderid, setOrderId] = useState<number>();
  const token = localStorage.getItem('access_token');
  const productHandler = data.map((el: TYPE_KakaoApi) => {
    const productDatas = {
      productOptionId: el.productOptionId,
      quantity: el.quantity,
    };
    return productDatas;
  });
  console.log('이거에룡용!!!', productHandler);

  return (
    <>
      <div>
        <TotalContainer>
          <div className="container">
            <div className="title flex justify-between py-4">
              <span className="font-semibold">주문상품 정보 / 총 2개</span>
              <span className="font-semibold text-sm text-gray-500">
                상세보기
              </span>
            </div>
            <Pay>
              <div className=" flex justify-between mt-6">
                <span className="text-sm text-gray-500">주문금액</span>
                <span className="font-semibold text-lg">109,200원</span>
              </div>
              <div className=" flex justify-between">
                <span className="text-sm text-gray-500">(+)배송비</span>
                <span className="font-semibold text-lg">무료</span>
              </div>
              <div className=" flex justify-between">
                <span className=" text-sm text-gray-500">(-)상품할인</span>
                <span className="font-semibold text-lg">11,400원</span>
              </div>
              <div className=" flex justify-between py-4">
                <span className="">총 결제 금액</span>
                <span className="font-semibold text-xl text-red-700">
                  97,800원
                </span>
              </div>
            </Pay>
            <Agree>
              <div className="text-sm text-gray-500 my-5">
                <CheckBox data={data} />
              </div>
            </Agree>
          </div>
        </TotalContainer>
      </div>
    </>
  );
};
export default Totalpay;
