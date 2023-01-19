import React, { useState } from 'react';
import RadiusButton from './RadiusButton';
import styled from 'styled-components';

const Textinput = styled.input`
  width: 200px;
`;

const TextDiv = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 200px;
`;

interface Props {
  children?: string;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Component?: React.FC;
  namevalue?: string;
}

// interface Value {
//   inputBoolean?: boolean;
//   checkBoolean?: boolean;
// }

// const INITIAL = {
//   inputBoolean: true,
//   checkBoolean: true,
// };

const ComponentsInput: React.FC<Props> = ({
  Component,
  children,
  namevalue,
  onClick,
}) => {
  const [control, setcontrol] = useState<boolean>(true);

  const errorempty: string = `${namevalue}이 등록되지 않았습니다.
  입력해 주세요.`;
  const onClickForm = () => {
    setcontrol(!control);
  };

  return (
    <div className="mb-5 flex">
      {control ? (
        <div className="flex">
          <TextDiv>하이</TextDiv>
          <RadiusButton onClick={onClickForm}>수정</RadiusButton>
        </div>
      ) : (
        <div className="flex">
          {Component ? (
            <Component />
          ) : (
            <Textinput
              data-type="text"
              name={namevalue ? namevalue : 'text'}
              maxLength={10}
              onChange={onClick}
              type="text"
              data-error-empty={errorempty}
            ></Textinput>
          )}
          <RadiusButton onClick={onClickForm}>확인</RadiusButton>

          <RadiusButton onClick={onClickForm}>취소</RadiusButton>
        </div>
      )}
    </div>
  );
};

export default ComponentsInput;
