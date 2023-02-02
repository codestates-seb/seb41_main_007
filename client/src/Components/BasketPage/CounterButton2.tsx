import styled from 'styled-components';
import { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import ComponentModal from 'Components/Common/ComponentModal';
import useBooleanInput from 'CustomHook/useBooleaninput';

const Counterdiv = styled.div`
  box-sizing: border-box;
  width: 120px;
  position: relative;
`;
const Counterbutton = styled.button<{ isTrue: boolean }>`
  box-sizing: border-box;
  width: 120px;
  position: relative;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  padding-left: 7px;
  ${(props) => (props.isTrue ? 'left: 0' : 'right: 0')};
  border: 1px solid var(--gray-15);
  background: none;
`;
const CounterImg = styled.img`
  vertical-align: middle;
  padding: 0;
  margin: 0;
`;
const Counterinput = styled.input`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 12px;
  border: 1px solid var(--gray-15);
`;
interface props {
  setnumber: Dispatch<SetStateAction<number>>;
  countNumber: number;
  optionId: number;
  session: string | null | boolean;
}

const CounterButton2: FC<props> = ({
  setnumber,
  countNumber,
  optionId,
  session,
}) => {
  const [isControl, onisControl, setisControl] = useBooleanInput(true);
  const [count, setCount] = useState<number>(countNumber);

  const onIncrease = () => {
    setCount((prevCount) => {
      if (prevCount === 5) {
        onisControl();
        return prevCount;
      }

      return prevCount + 1;
    });
  };

  const onDecrease = () => {
    setCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount;
      }

      return prevCount - 1;
    });
  };

  useEffect(() => {
    setnumber(count);
  }, [count]);

  return (
    <Counterdiv>
      <Counterbutton onClick={onIncrease} isTrue={true}>
        <CounterImg
          src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/+.svg"
          alt="add"
        />
      </Counterbutton>
      <Counterinput
        type="text"
        value={count}
        data-idx="0"
        readOnly
      ></Counterinput>
      <Counterbutton onClick={onDecrease} isTrue={false}>
        <CounterImg
          src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/-.svg"
          alt="minus"
        />
      </Counterbutton>
      {isControl ? (
        <></>
      ) : (
        <ComponentModal isButton={true} setValue={setisControl}>
          <div>
            현재 수량은 5개로 제한되어 있습니다 <br></br>전 상품 10% 할인을
            진행중입니다💸<br></br>
          </div>
        </ComponentModal>
      )}
    </Counterdiv>
  );
};

export default CounterButton2;
//set안에 이프문
//경고뭄ㄴ
