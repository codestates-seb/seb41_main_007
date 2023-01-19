import styled from 'styled-components';
import Postcode from './Postcode';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Container = styled.div``;

const User = styled.div`
  input {
    border: 1px solid #e5e5e5;
  }
`;
const AddressInput = styled.div``;

const Address: React.FC = () => {
  return (
    <>
      <Container>
        <User>
          <div className="text-sm font-semibold my-2">받는 분 정보</div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="이름"
              className="text-sm mr-2 w-5/12 h-8"
            ></input>
            <input
              type="text"
              placeholder="휴대폰 번호"
              className="text-sm w-5/12 h-8"
            ></input>
          </div>
        </User>
        <AddressInput>
          <div className="text-sm font-semibold mb-2">주소</div>
          <div className="bg-gray-50 py-2 text-xs mb-2 flex">
            <div className="text-lg mx-2">
              <FontAwesomeIcon icon={faCircleExclamation} />
            </div>
            <div className="text-sm text-gray-400 mt-1">
              상세주소가 없는 경우는 없음 으로 입력해 주세요.
            </div>
          </div>
          <Postcode />
        </AddressInput>
      </Container>
    </>
  );
};
export default Address;
