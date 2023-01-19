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
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        alert(`${e.target}를 통해 연락드리겠습니다!`);
      }}
    >
      <RadioGroup>
        <Radio name="contact" value="EMAIL" defaultChecked>
          이메일
        </Radio>
        <Radio name="contact" value="PHONE">
          전화
        </Radio>
        <Radio name="contact" value="FAX">
          팩스
        </Radio>
        <Radio name="contact" value="MAIL" disabled>
          우편
        </Radio>
      </RadioGroup>
      <button>제출</button>
    </form>
  );
}

// export default function RadioInput() {
//   return <div>RadioInput</div>;
// }
