import styled from 'styled-components';
import phoneNumberinput from './PhoneNumberinput';
import ComponentsInput from 'Components/Common/ComponentInput';
import { useState } from 'react';
import RadioInput from 'Components/Common/Radio/RadioInput';
import DatepickerInput from 'Components/Common/DatepickerInput';
import TinyTitle from 'Components/Common/TinyTitle';
import RadiusButton from 'Components/Common/RadiusButton';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { TYPE_People } from 'Types/common/product';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
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
  // const Person: TYPE_People[] = useAppSelector(selectDataP);
  // const P_Data: TYPE_People = Person[0];
  const { data, isLoading, error } = useCustomQuery(
    '/members',
    '/members',
    session,
  );
  const { mutate } = useCustomMutation(
    `/members`,
    `/members`,
    'PATCH',
    session,
    false,
  );
  if (isLoading) return <></>;
  if (error) return <></>;
  const P_Data: TYPE_People = data;
  const onPatchClick = () => {
    console.log(values);
    mutate(values);
  };

  console.log(values);
  // const birthDay = P_Data.birth.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
  //P_Data.name P_Data.age 잠시대체
  return (
    <>
      <Container>
        <User>
          <TinyTitle>이름</TinyTitle>
          <ComponentsInput
            P_Value={P_Data.name}
            onSave={onSave}
          ></ComponentsInput>

          <TinyTitle>성별</TinyTitle>
          <ComponentsInput
            P_Value={P_Data.gender}
            onSave={onSave}
            Component={RadioInput}
          ></ComponentsInput>
          <TinyTitle>생일</TinyTitle>
          <ComponentsInput
            P_Value={P_Data.birth}
            onSave={onSave}
            Component={DatepickerInput}
          ></ComponentsInput>
          <TinyTitle>연락처</TinyTitle>
          <ComponentsInput
            P_Value={P_Data.phoneNumber}
            onSave={onSave}
            Component={phoneNumberinput}
          ></ComponentsInput>
          <TinyTitle>이메일</TinyTitle>
          <ComponentsInput
            P_Value={P_Data.email}
            isDisabled={true}
            onSave={onSave}
          ></ComponentsInput>
        </User>
      </Container>
      <div className="my-5 relative h-6">
        <div className="absolute top-0 left-0">
          <RadiusButton onClick={() => onPatchClick()}>저장</RadiusButton>
        </div>
      </div>
    </>
  );
};
export default MyProfile;

//회원탈퇴시 토큰빼고 홈으로
