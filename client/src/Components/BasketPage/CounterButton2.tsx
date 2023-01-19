import styled from 'styled-components';
import { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';

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
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 12px;
  border: 1px solid var(--gray-15);
`;
interface props {
  setnumber: Dispatch<SetStateAction<number>>;
}

const CounterButton2: FC<props> = ({ setnumber }) => {
  const [count, setCount] = useState<number>(1);
  const onIncrease = () => {
    setCount((prevCount) => prevCount + 1);
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
      <Counterinput type="text" value={count} data-idx="0"></Counterinput>
      <Counterbutton onClick={onDecrease} isTrue={false}>
        <CounterImg
          src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/-.svg"
          alt="minus"
        />
      </Counterbutton>
    </Counterdiv>
  );
};

export default CounterButton2;
