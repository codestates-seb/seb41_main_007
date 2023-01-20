import styled from 'styled-components';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ComponentsInput from 'Components/Common/ComponentInput';
import { useState } from 'react';
import RadioInput from 'Components/Common/Radio/RadioInput';

const Container = styled.div``;

const User = styled.div`
  input {
    border: 1px solid #e5e5e5;
  }
`;
const AddressInput = styled.div``;

const MyProfile: React.FC = () => {
  const [values, setValues] = useState({});
  const onSave = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };
  console.log(values);
  return (
    <>
      <Container>
        <User>
          <div className="text-sm font-semibold my-2">이름</div>
          <ComponentsInput onSave={onSave}></ComponentsInput>
          <ComponentsInput
            onSave={onSave}
            Component={RadioInput}
          ></ComponentsInput>
        </User>
        <RadioInput></RadioInput>
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
        </AddressInput>
      </Container>
    </>
  );
};
export default MyProfile;
