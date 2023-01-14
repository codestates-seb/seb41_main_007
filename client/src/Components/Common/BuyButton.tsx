import { FC } from 'react';
import styled from 'styled-components';

const Buybutton = styled.a<{ background?: string; color?: string }>`
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  vertical-align: baseline;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.color};
  white-space: nowrap;
  height: 60px;
  line-height: 60px;
  padding: 0 12px;
  border: 1px solid var(--gray-02);
  display: block;
  width: 350px;
  background-color: ${(props) => props.background};
  margin-top: 13px;
`;

interface Props {
  children?: string;
  onClick?: () => void;
  background?: string;
  color?: string;
}

const BuyButton: FC<Props> = ({ background, color, children, onClick }) => {
  console.log(children);
  console.log(background);

  return (
    <>
      <Buybutton onClick={onClick} background={background} color={color}>
        {children}
      </Buybutton>
    </>
  );
};

export default BuyButton;
