import Address from 'Components/PaymentPage/Address';
import styled from 'styled-components';
import { useState } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
`;
const PaymentPage: React.FC = () => {
  const [address, setAddress] = useState<boolean>(true); //배송지
  return (
    <>
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
      </Title>
    </>
  );
};
export default PaymentPage;
