import Address from 'Components/PaymentPage/Adress';
import Payment from 'Components/PaymentPage/Payment';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Totalpay from 'Components/PaymentPage/Totalpay';
import BasketFour from 'Components/PaymentPage/Basketfour';
import { BGcontainer } from 'Components/Common/BGcontainer';
import Modal from 'Components/Common/Modal';
import { useSelector } from 'react-redux';
import { useSession } from 'CustomHook/useSession';
import { TYPE_CartData } from 'Types/common/product';
import BasketfourList from 'Components/PaymentPage/BasketfourList';

import Empty from 'Components/Common/Empty';

const Container = styled.div`
  width: 830px;
`;

const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`;

const PaymentPage = () => {
  const [order, setOrder] = useState<boolean>(true);
  const [address, setAddress] = useState<boolean>(true); //배송지
  const [payment, setPayment] = useState<boolean>(true); //결제수단
  const isModal = useSelector((state: any) => state.modal.isOpenModal);

  const [data, setdata] = useState<TYPE_CartData[]>([]);
  const [isloading, setisLoading] = useState<boolean>(true);
  const { loading, session } = useSession();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session}`,
      },
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        setdata(res);
        setisLoading(false); //무한렌더링 막기용
      })
      .catch((e) => {
        console.log(e);
        setisLoading(false);
      });
  }, []);
  if (loading) return <Empty />;
  if (isloading) return <Empty />;

  return (
    <div>
      {isModal && <Modal />}
      <BGcontainer>
        <div className="flex">
          <Container>
            <div className="font-semibold py-4 text-2xl mb-3"> 주문서</div>
            <Title>
              <div className=" font-semibold py-4 text-xl">
                주문상품정보 / 총2개
              </div>
              <button onClick={() => setOrder(!order)}>
                {order ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            {order && <BasketfourList data={data} />}
            <Title>
              <div className=" font-semibold py-4 text-xl">배송지</div>
              <button onClick={() => setAddress(!address)}>
                {address ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            {address && <Address />}
            <Title>
              <div className=" font-semibold py-4 text-xl">결제수단</div>
              <button onClick={() => setPayment(!payment)}>
                {payment ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            {payment && <Payment />}
          </Container>
          <Totalpay />
        </div>
      </BGcontainer>
    </div>
  );
};
export default PaymentPage;

//패치오류 났음 세션 문제
