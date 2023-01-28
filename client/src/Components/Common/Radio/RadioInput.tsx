import RadioGroup from './RadioGroup';
import Radio from './Radio';

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
      className=" w-96 h-12 "
    >
      <RadioGroup>
        <div className="flex ">
          <div className="m">
            <Radio name="gender" value="남성" onSave={onChangeSave}>
              &nbsp;남성
            </Radio>
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio name="gender" value="여성" onSave={onChangeSave}>
              &nbsp;여성
            </Radio>
          </div>
        </div>
      </RadioGroup>
    </form>
  );
};

export default RadioInput;
