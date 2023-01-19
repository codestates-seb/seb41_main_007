import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';
import useInput from 'CustomHook/useInput';
import styled from '@emotion/styled';
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
const Postcode: React.FC = () => {
  const [number, setNumber] = useState();
  const [address, setAddress] = useState('');
  const [user, changeUser] = useInput('');
  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = data.zonecode;

    setAddress(fullAddress);
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
          value={number}
          onClick={handleClick}
          className="w-10/12"
          placeholder="우편번호 버튼을 눌러주세요"
        ></input>
        <button type="button" onClick={handleClick} className="w-1/12 ml-14">
          우편번호
        </button>
        <div>
          <input
            value={address}
            onClick={handleClick}
            className="w-full"
          ></input>
        </div>
        <div>
          <input
            onChange={changeUser}
            className="w-full"
            placeholder="상세주소"
          ></input>
        </div>
      </PostcodeContainer>
    </>
  );
};

export default Postcode;
