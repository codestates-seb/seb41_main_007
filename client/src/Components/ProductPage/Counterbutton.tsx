import styled from 'styled-components';
import { counterProps } from 'Pages/ProductPage';

const CounterDiv = styled.div`
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: var(--bg-white-05);
`;
const CounterDivBox = styled.div`
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  position: relative;
  width: 77px;
  border: 1px solid var(--bg-white-05);
`;
const Counterbutton = styled.button<{ isTrue: boolean }>`
  cursor: pointer;
  outline: none;
  padding: 0;
  border: 0;

  line-height: 1;
  background: none;
  font-family: inherit;
  border-radius: 0;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0;

  ${(props) => (props.isTrue ? 'left: 0' : 'right: 0')};

  background: var(--bg-white-05);
`;

const CounterInput = styled.input`
  outline: none;
  border: 1px solid var(--bg-white-05);
  border-radius: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  height: 24px;
  padding: 0 25px 0 24px;
  text-align: center;
  font-size: 12px;
  background: var(--bg-white-05);
`;

const CounterButton = (props: counterProps): JSX.Element => {
  return (
    <CounterDiv>
      <CounterDivBox>
        <Counterbutton onClick={props.onIncrease} isTrue={true} type="button">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0"
          />
          <span className="material-symbols-outlined">add_box</span>
        </Counterbutton>
        <CounterInput type="number" value={props.count} readOnly></CounterInput>
        <Counterbutton onClick={props.onDecrease} isTrue={false}>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
          />
          <span className="material-symbols-outlined text-xs">
            indeterminate_check_box
          </span>
        </Counterbutton>
      </CounterDivBox>
    </CounterDiv>
  );
};
export default CounterButton;
//다양한툴 밀림현상
