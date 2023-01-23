import styled from 'styled-components';

import ComponentsInput from 'Components/Common/ComponentInput';
import { useState } from 'react';
import RadioInput from 'Components/Common/Radio/RadioInput';
import DatepickerInput from 'Components/Common/DatepickerInput';
import TinyTitle from 'Components/Common/TinyTitle';

const Container = styled.div``;

const User = styled.div`
  input {
    border: 1px solid #e5e5e5;
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
        </User>
      </Container>
    </>
  );
};
export default MyProfile;
