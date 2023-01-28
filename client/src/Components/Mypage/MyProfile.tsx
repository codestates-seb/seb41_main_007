import styled from 'styled-components';
import phoneNumberinput from './PhoneNumberinput';
import ComponentsInput from 'Components/Common/ComponentInput';
import { useState } from 'react';
import RadioInput from 'Components/Common/Radio/RadioInput';
import DatepickerInput from 'Components/Common/DatepickerInput';
import TinyTitle from 'Components/Common/TinyTitle';
import RadiusButton from 'Components/Common/RadiusButton';

const Container = styled.div``;

const User = styled.div`
  input {
    &:focus {
      outline: none;
    }
  }
`;

const MyProfile: React.FC = () => {
  const [values, setValues] = useState({});
  const onSave = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Container>
        <User>
          <TinyTitle>이름</TinyTitle>
          <ComponentsInput onSave={onSave}></ComponentsInput>

          <TinyTitle>성별</TinyTitle>
          <ComponentsInput
            onSave={onSave}
            Component={RadioInput}
          ></ComponentsInput>
          <TinyTitle>생일</TinyTitle>
          <ComponentsInput
            onSave={onSave}
            Component={DatepickerInput}
          ></ComponentsInput>
          <TinyTitle>연락처</TinyTitle>
          <ComponentsInput
            onSave={onSave}
            Component={phoneNumberinput}
          ></ComponentsInput>
          <TinyTitle>이메일</TinyTitle>
          <ComponentsInput isDisabled={true} onSave={onSave}></ComponentsInput>
        </User>
      </Container>
      <div className="my-5 relative h-6">
        <div className="absolute top-0 left-0">
          <RadiusButton>저장</RadiusButton>
        </div>
      </div>
    </>
  );
};
export default MyProfile;
