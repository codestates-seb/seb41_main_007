import RadioGroup from './RadioGroup';
import Radio from './Radio';
import { useState } from 'react';

// interface Props {
//   children?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

// }

interface Props {
  children?: string;
  onChangeSave: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

// export default function RadioInput(onChange: (gender?: string) => void)
const RadioInput: React.FC<Props> = ({ children, onChangeSave }) => {
  return (
    <form
    // onSubmit={() => {
    //   alert(`${valueSave}를 통해 연락드리겠습니다!`);
    // }}
    >
      <RadioGroup>
        <Radio name="gender" value="남성" onSave={onChangeSave}>
          남성
        </Radio>
        <Radio name="gender" value="여성" onSave={onChangeSave}>
          여성
        </Radio>
      </RadioGroup>
    </form>
  );
};

export default RadioInput;
