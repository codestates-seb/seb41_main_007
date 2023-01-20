import React, { useState, ElementType } from 'react';
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
  onSave?: (name: string, value: string) => void;
  Component?: ElementType<any> | undefined;
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
  onSave,
}) => {
  const [control, setcontrol] = useState<boolean>(true);
  const [data, setdata] = useState<string>('');
  const errorempty: string = `${namevalue}이 등록되지 않았습니다.
  입력해 주세요.`;
  const onClickForm = () => {
    setcontrol(!control);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSave?.(name, value);
    setdata(value);
  };

  return (
    <div className="mb-5 flex">
      {control ? (
        <div className="flex">
          <TextDiv>{data}</TextDiv>
          <RadiusButton onClick={onClickForm}>수정</RadiusButton>
        </div>
      ) : (
        <div className="flex">
          {Component ? (
            <Component onChange={onChange} />
          ) : (
            <Textinput
              data-type="text"
              name={namevalue ? namevalue : 'text'}
              maxLength={10}
              onChange={onChange}
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
