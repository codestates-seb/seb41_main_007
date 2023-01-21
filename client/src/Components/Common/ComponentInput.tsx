import React, { useState, ElementType } from 'react';
import RadiusButton from './RadiusButton';
import styled from 'styled-components';

const Textinput = styled.input`
  width: 384px;
  margin: 10px 0;
  height: 28px;
`;

const TextDiv = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 384px;
  margin: 10px 0;
  height: 28px;
`;

interface Props {
  children?: string;
  onSave: (name: string, value: string) => void;
  Component?: ElementType<any> | undefined;
  namevalue?: string;
}

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

  const onData = (name: string, value: string) => {
    console.log('안녕');
    onSave(name, value);
    setdata(value);
  };

  const onChangeSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    onSave(name, value);

    setdata(value);
  };

  return (
    <div className="mb-5 flex ">
      {control ? (
        <div className="flex items-center">
          <TextDiv>{data}</TextDiv>
          <RadiusButton onClick={onClickForm}>수정</RadiusButton>
        </div>
      ) : (
        <div className="flex items-center">
          {Component ? (
            <Component onChangeSave={onChangeSave} onSave={onData} />
          ) : (
            <Textinput
              data-type="text"
              name={namevalue ? namevalue : 'text'}
              maxLength={10}
              onChange={onChangeSave}
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

//onSave?.(name, value);
//컴포넌트화 시킬때 두가지 함수가 필요했따
//e , stringx
