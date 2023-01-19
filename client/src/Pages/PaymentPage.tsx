import Address from 'Components/PaymentPage/Address';
import Payment from 'Components/PaymentPage/Payment';
import styled from 'styled-components';
import { useState } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Container = styled.div`
  margin: 130px auto;
  width: 1230px;
`;
const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`;

const PaymentPage: React.FC = () => {
  const [address, setAddress] = useState<boolean>(true); //배송지
  const [payment, setPayment] = useState<boolean>(true); //결제수단
  return (
    <>
      <Container>
        <Title>
          <div className="text-base font-semibold py-4">배송지</div>
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
          <div className="text-base font-semibold py-4">결제수단</div>
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
    </>
  );
};
export default PaymentPage;
