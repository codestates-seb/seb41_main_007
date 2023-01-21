import React, { useState, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import useBooleanInput from 'CustomHook/useBooleaninput';
import useInput from 'CustomHook/useInput';
import styled from '@emotion/styled';
import type { UserProfile } from 'Components/Mypage/DeliverySave';

const PostcodeContainer = styled.div`
  border-top: 1px solid black;
  padding: 13px 0px;
  button {
    border: 1px solid black;
    padding: 5px 15px;
  }
  input {
    border: 1px solid #ededed;
    padding: 5px 15px;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid #ededed;
    }
  }
`;

interface Props {
  onSave?: (name: string, value: string) => void;
  children?: string;
  data?: UserProfile;
  oncontrolCilck?: () => void;
}

const Postcode: React.FC<Props> = ({ onSave, data }) => {
  const saveadress: string[] | undefined = data?.adress.split('(');

  let first = saveadress?.[1].substring(0, 5);
  let second = saveadress?.[1].substring(7);
  let third = saveadress?.[2].slice(0, -1);
  const [number, setNumber] = useState(first);
  const [adress, setAdress] = useState(second);
  const [control, setcontrol] = useBooleanInput(true);

  const open = useDaumPostcodePopup();

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const adressdata = `(${String(number)}) ${adress} (${value})`;
    onSave?.('adress', adressdata);
  };

  console.log(first, second, third);
  console.log('김치');

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = data.zonecode;

    setAdress(fullAddress);
    setNumber(extraAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <PostcodeContainer>
        <div></div>
        <input
          value={first}
          onClick={handleClick}
          className="w-9/12"
          placeholder="우편번호 버튼을 눌러주세요"
          readOnly
        ></input>
        <button type="button" onClick={handleClick} className="w-26 ml-6">
          우편번호
        </button>
        <div>
          <input
            value={second}
            onClick={handleClick}
            className="w-full"
            readOnly
          ></input>
        </div>
        <div>
          <input
            value={third}
            onChange={onChangeForm}
            className="w-full"
            placeholder="상세주소"
            onBlur={setcontrol}
          ></input>
        </div>
      </PostcodeContainer>
    </>
  );
};

export default Postcode;

//undefined가 들어옴
// useEffect(() => {
//   const value = `(${String(number)}) ${adress} (${user})`;
//   onSave?.('adress', value);
//   console.log('바뀜');

//   console.log('빠이');
// }, []);
//데이터가 동시에바뀌면 안됨

// const [number, setNumber] = useState(first);
// const [adress, setAdress] = useState(second);
// const [control, setcontrol] = useBooleanInput(true)

//유즈스테이수정
