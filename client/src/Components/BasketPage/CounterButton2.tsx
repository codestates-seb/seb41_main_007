import { FC } from 'react';
import styled from 'styled-components';

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

const CounterButton2: FC = () => {
  return (
    <Counterdiv>
      <Counterbutton isTrue={true}>
        <CounterImg
          src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/+.svg"
          alt="add"
        />
      </Counterbutton>
      <Counterinput type="text" value="1" data-idx="0"></Counterinput>
      <Counterbutton isTrue={false}>
        <CounterImg
          src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/-.svg"
          alt="minus"
        />
      </Counterbutton>
    </Counterdiv>
  );
};

export default CounterButton2;
