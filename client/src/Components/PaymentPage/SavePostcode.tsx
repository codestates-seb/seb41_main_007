import React, { useState, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import useBooleanInput from 'CustomHook/useBooleaninput';

import styled from '@emotion/styled';
import { TYPE_UserAddress } from 'Types/common/product';

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
  onSaveData: (name: string, value: string) => void;
  children?: string;
  onControl: () => void;
  isControl: boolean;
  dataPut?: TYPE_UserAddress;
  addressValue: string[];
  oncontrolCilck?: () => void;
}

const SavePostcode: React.FC<Props> = ({
  onSaveData,
  addressValue,
  onControl,
  isControl,
}) => {
  const [addressNumber, setaddressNumber] = useState(addressValue[0]);
  const [address, setaddress] = useState<string>(addressValue[1]);
  const [Detail, setDetail] = useState<string>(addressValue[2]);

  const open = useDaumPostcodePopup();

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDetail(value);
    const addressdata = `(${String(addressNumber)}) ${address} (${value})`;

    onSaveData('detailAddress', addressdata);
  };

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const extraAddress = data.zonecode;

    setaddress(fullAddress);
    setaddressNumber(extraAddress);
    setDetail('');
    onControl();
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <PostcodeContainer>
        <div></div>
        <input
          value={isControl ? '' : addressNumber}
          onClick={handleClick}
          className="w-9/12"
          placeholder="우편번호 버튼을 입력하세요"
          readOnly
        ></input>
        <button type="button" onClick={handleClick} className="w-26 ml-6">
          우편번호
        </button>
        <div>
          <input
            value={isControl ? '' : address}
            onClick={handleClick}
            className="w-full"
            readOnly
          ></input>
        </div>
        <div>
          {isControl ? (
            <input
              value={
                isControl
                  ? '우편 번호를 입력하시고 상세주소를 입력하세요'
                  : Detail
              }
              readOnly
              className="w-full"
              placeholder="우편 번호를 입력하시고 상세주소를 입력하세요"
              disabled
            ></input>
          ) : (
            <input
              value={Detail}
              onChange={onChangeForm}
              className="w-full"
              placeholder="우편 번호를 입력하시고 상세주소를 입력하세요"
            ></input>
          )}
        </div>
      </PostcodeContainer>
    </>
  );
};

export default SavePostcode;

//undefined가 들어옴
// useEffect(() => {
//   const value = `(${String(number)}) ${address} (${user})`;
//   onSave?.('address', value);

// }, []);
//데이터가 동시에바뀌면 안됨

// const [number, setNumber] = useState(first);
// const [address, setaddress] = useState(second);
// const [control, setcontrol] = useBooleanInput(true)

//유즈스테이수정
//체인지가 된 값을 받아와서 change 수정을 할수가 없었음
//그래서 체인지와 동시에 수정 할 수 있또록 바꾸었음
//그랬더니 체인지 되자말자 undefined값이 들어옴 그래서 초기값에 데이터를 내려줘서 휘발성을 막음
//쪼개는 값에 문제생김
//map문제가 있었음
