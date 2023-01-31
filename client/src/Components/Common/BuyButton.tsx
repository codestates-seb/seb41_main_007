import { FC } from 'react';
import styled from 'styled-components';

const Buybutton = styled.a<{
  background?: string;
  color?: string;
  margin?: string;
}>`
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  vertical-align: baseline;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color};
  white-space: nowrap;
  height: 60px;
  line-height: 60px;
  padding: 0 12px;
  border: 1px solid var(--black-20);
  display: block;
  margin: ${(props) => props.margin};
  width: 350px;
  background-color: ${(props) => props.background};
  margin-top: 13px;
  z-index: 4000;
  &:hover {
    outline: none;
    border-width: 1px;
    box-shadow: 0 0 0 4px #e9f5db, 0 0 0 4px #e9f5db;
  }
`;

interface Props {
  children?: string;
  onClick?: () => void;
  background?: string;
  color?: string;
  margin?: string;
}

const BuyButton: FC<Props> = ({
  background,
  color,
  children,
  onClick,
  margin,
}) => {
  return (
    <>
      <Buybutton
        onClick={onClick}
        background={background}
        color={color}
        margin={margin}
      >
        {children}
      </Buybutton>
    </>
  );
};

export default BuyButton;
