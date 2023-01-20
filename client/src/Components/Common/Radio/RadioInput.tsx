import RadioGroup from './RadioGroup';
import Radio from './Radio';
import { useState } from 'react';
export default function RadioInput() {
  const [valueSave, setvalueSave] = useState<string>('');
  const onSave = (el: string) => {
    setvalueSave(el);
  };
  return (
    <form
      onSubmit={() => {
        alert(`${valueSave}를 통해 연락드리겠습니다!`);
      }}
    >
      <RadioGroup>
        <Radio name="gender" value="남성" onSave={onSave} defaultChecked>
          남성
        </Radio>
        <Radio name="gender" value="여성" onSave={onSave}>
          여성
        </Radio>
      </RadioGroup>
    </form>
  );
}

// export default function RadioInput() {
//   return <div>RadioInput</div>;
// }
