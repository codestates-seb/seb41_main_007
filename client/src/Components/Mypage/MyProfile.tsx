import styled from 'styled-components';
import phoneNumberinput from './PhoneNumberinput';
import ComponentsInput from 'Components/Common/ComponentInput';
import { useState } from 'react';
import RadioInput from 'Components/Common/Radio/RadioInput';
import DatepickerInput from 'Components/Common/DatepickerInput';
import TinyTitle from 'Components/Common/TinyTitle';
import RadiusButton from 'Components/Common/RadiusButton';
import { useAppSelector } from 'Redux/app/hook';
import { selectDataP } from 'Redux/reducer/personDataSlice';
import { TYPE_People } from 'Types/common/product';

const Container = styled.div``;

const User = styled.div`
  input {
    &:focus {
      outline: none;
    }
  }
`;

const MyProfile: React.FC<{ session: any }> = ({ session }) => {
  const [values, setValues] = useState({});
  const onSave = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };
  console.log(session);
  const Person: TYPE_People[] = useAppSelector(selectDataP);
  const P_Data: TYPE_People = Person[0];

  //P_Data.name P_Data.age 잠시대체
  return (
    <>
      <Container>
        <User>
          <TinyTitle>이름</TinyTitle>
          <ComponentsInput
            P_Value={'잠시햇어'}
            onSave={onSave}
          ></ComponentsInput>

          <TinyTitle>성별</TinyTitle>
          <ComponentsInput
            P_Value={''}
            onSave={onSave}
            Component={RadioInput}
          ></ComponentsInput>
          <TinyTitle>생일</TinyTitle>
          <ComponentsInput
            P_Value={'버그대체'}
            onSave={onSave}
            Component={DatepickerInput}
          ></ComponentsInput>
          <TinyTitle>연락처</TinyTitle>
          <ComponentsInput
            P_Value={'P_Data.phone'}
            onSave={onSave}
            Component={phoneNumberinput}
          ></ComponentsInput>
          <TinyTitle>이메일</TinyTitle>
          <ComponentsInput
            P_Value={'P_Data.email'}
            isDisabled={true}
            onSave={onSave}
          ></ComponentsInput>
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
