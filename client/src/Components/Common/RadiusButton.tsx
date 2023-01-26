import React from 'react';
import styled from 'styled-components';

const Radiusbutton = styled.button`
  width: 46px;
  height: 26px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 26px;
  font-size: 12px;
  color: black;
  font-weight: bold;
  margin-left: 4px;
  padding-right: 2px;
`;
interface Props {
  children?: string;
  onClick?: () => void;
}

const RadiusButton: React.FC<Props> = ({ onClick, children }) => {
  return <Radiusbutton onClick={onClick}>{children}</Radiusbutton>;
};

export default RadiusButton;
