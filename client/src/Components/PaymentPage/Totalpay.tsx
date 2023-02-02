import styled from 'styled-components';
import CheckBox from 'Components/Common/CheckBox';
import {
  TYPE_CartData,
  TYPE_KakaoApi,
  TYPE_UrlProp,
} from 'Types/common/product';
import { useEffect, useState } from 'react';
import { useNumberComma } from 'Utils/commonFunction';
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
const INITIALVALUE = {
  next_redirect_pc_url: '',
  created_at: '',
  next_redirect_mobile_url: '',
  tid: '',
};

const Totalpay: React.FC<{ data: TYPE_CartData[] }> = ({ data }) => {
  const [orderId, setOrderId] = useState<number>(0);
  const [urlData, setUrlData] = useState<TYPE_UrlProp>(INITIALVALUE);
  const token = localStorage.getItem('access_token');
  console.log(data, '받아온 데이터 장바구니');
  const productHandler = data.map((el: TYPE_KakaoApi) => {
    const productDatas = {
      productOptionId: el.productOptionId,
      quantity: el.quantity,
    };
    return productDatas;
  });

  const PriceForPills = data.map((el) => {
    return (el.productOptionPrice + el.productPrice) * el.quantity;
  });

  const TotalForPills = PriceForPills.reduce((a, b) => a + b, 0);
  console.log('꼬꼬링', PriceForPills);
  console.log('합친결과', TotalForPills);

  const DiscountForPills = TotalForPills * 0.1;

  const CountForPills = data.map((el) => {
    return el.quantity;
  });
  const CountsForPills = CountForPills.reduce((a, b) => a + b, 0);
  console.log(CountForPills, 'CountForPills');
  console.log(CountsForPills, 'CountsForPills');
  useEffect(() => {}, []);

  const onClickhandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: '주소',
        name: '시영',
        phone: '010-1111-1111',
        orderProductPostDtos: productHandler,
      }),
      method: 'POST',
    })
      .then((response) => response.json())
      .then((response) => {
        setOrderId(response.data);
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/payment/ready?order_id=${response.data}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        )
          .then((response) => response.json())
          .then((response) => {
            let popupWidth = 600;
            let popupHeight = 900;
            let popupX = Math.ceil((window.screen.width - popupWidth) / 2);
            let popupY = Math.ceil((window.screen.height - popupHeight) / 2);
            window.open(
              response.next_redirect_pc_url,
              '팝업',
              'width=' +
                popupWidth +
                ',height=' +
                popupHeight +
                ',left=' +
                popupX +
                ', top=' +
                popupY,
            );
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => console.info(e));
  };
  return (
    <>
      <div>
        <TotalContainer>
          <div className="container">
            <div className="title py-4">
              <span className="font-semibold">
                주문상품 정보 / 총 {useNumberComma(CountsForPills)}개
              </span>
            </div>
            <Pay>
              <div className=" flex justify-between mt-6 mb-2">
                <span className="text-sm text-gray-500">주문금액</span>
                <span className="font-semibold text-lg">
                  {useNumberComma(TotalForPills)}원
                </span>
              </div>
              <div className=" flex justify-between mb-2">
                <span className="text-sm text-gray-500">(+)배송비</span>
                <span className="font-semibold text-lg">무료</span>
              </div>
              <div className=" flex justify-between">
                <span className=" text-sm text-gray-500">(-)상품할인10%</span>
                <span className="font-semibold text-lg">
                  {useNumberComma(DiscountForPills)}원
                </span>
              </div>
              <div className=" flex justify-between py-6">
                <span className="">총 결제 금액</span>
                <div className="font-semibold text-xl text-red-700">
                  {useNumberComma(TotalForPills - DiscountForPills)}원
                </div>
              </div>
            </Pay>
            <Agree>
              <div className="text-sm text-gray-500 my-5">
                <CheckBox
                  data={data}
                  onClickhandler={onClickhandler}
                  kakaoUrl={urlData}
                />
              </div>
            </Agree>
          </div>
        </TotalContainer>
      </div>
    </>
  );
};
export default Totalpay;
