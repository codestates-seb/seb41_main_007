import React from 'react';
import { Textinput } from 'Components/Common/ComponentInput';
interface props {
  data?: any;
  onChangeForm?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNumber?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: (name: string, value: string) => void;
  isTrue?: boolean;
}

const phoneNumberinput: React.FC<props> = ({
  data,
  onSave,
  onChangeNumber,
  isTrue,
}) => {
  return (
    <Textinput
      type="text"
      placeholder="휴대폰 번호"
      className="text-sm w-5/12 h-8 all: unset"
      onChange={onChangeNumber}
      value={data}
      maxLength={11}
      name="phoneNumber"
      isTrue={isTrue}
    ></Textinput>
  );
};

export default phoneNumberinput;
