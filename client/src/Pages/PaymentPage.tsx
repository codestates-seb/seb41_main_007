import Address from 'Components/PaymentPage/address';
import Payment from 'Components/PaymentPage/Payment';
import styled from 'styled-components';
import { useState } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Totalpay from 'Components/PaymentPage/Totalpay';
const Container = styled.div`
  margin: 200px 0px 200px 300px;
  width: 830px;
`;
const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`;

const PaymentPage: React.FC = () => {
  const [order, setOrder] = useState<boolean>(true);
  const [address, setAddress] = useState<boolean>(true); //배송지
  const [payment, setPayment] = useState<boolean>(true); //결제수단
  return (
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
  );
};
export default PaymentPage;
