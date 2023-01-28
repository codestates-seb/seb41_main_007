import React, { useState, ElementType, useCallback } from 'react';
import RadiusButton from './RadiusButton';
import styled from 'styled-components';

export const Textinput = styled.input<{ isTrue?: boolean }>`
  width: 384px;
  margin: 10px 0;
  height: 28px;
  border: ${(props) =>
    props.isTrue ? ' 2px solid var(--red-00)' : '1px solid var(--gray-43)'};

  &:focus {
    outline: none;
  }
`;

const TextDiv = styled.div`
  border-bottom: 1px solid var(--gray-02);

  width: 384px;
  margin: 10px 0;
  height: 28px;
`;

interface Props {
  children?: string;
  onSave: (name: string, value: string) => void;
  Component?: ElementType<any> | undefined;
}

const ComponentsInput: React.FC<Props> = ({
  Component,
  children,

  onSave,
}) => {
  const [control, setcontrol] = useState<boolean>(true);
  const [data, setdata] = useState<string>(''); // 데이타 출력
  const [dataname, setdataname] = useState<string>(''); //타입 이름 기억해줌
  const [backup, setbackup] = useState<string>(''); //백업 데이터
  const [nameMessage, setNameMessage] = useState<string>(''); //오류 메세지
  const [isName, setIsName] = useState<boolean>(false);
  const [iserror, setIserror] = useState<boolean>(false);

  const onClickForm = () => {
    if (dataname === 'name' || dataname === 'phonenumber') {
      if (isName || control) {
        setcontrol(!control);
        setIserror(false);
      } else {
        setNameMessage('양식에 맞춰 입력해주세요.');
        setIserror(true);
      }
    } else {
      setcontrol(!control);
      setIserror(false);
    }
  };

  const onputForm = () => {
    setcontrol(!control);
    setbackup(data);
    setIserror(false);
  };
  const onCancelForm = () => {
    setcontrol(!control);
    setdata(backup);
    setIserror(false);
  };

  const onData = (name: string, value: string) => {
    onSave(name, value);
    setdata(value);
  };

  const onChangeSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    onSave(name, value);
    setdataname(name);
    setdata(value);
  };

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      setIsName(false);
      onSave(e.target.name, '');
      setdata('');
      setIserror(true);
    } else {
      setNameMessage('올바른 형식입니다 :)');
      setIsName(true);
      onChangeSave(e);
      setIserror(false);
    }
  }, []);

  const onChangeNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 11 || e.target.value.length > 12) {
        setNameMessage('-를 제외한 11자리를 입력해주세요');
        setIsName(false);
        onSave(e.target.name, '');
        setdataname(e.target.name);
        setdata('');
        setIserror(true);
      } else {
        setNameMessage('올바른 형식입니다 :)');
        setIsName(true);
        onChangeSave(e);
        setIserror(false);
      }
    },
    [],
  );

  return (
    <div>
      <div className=" flex ">
        {control ? (
          <>
            <div className="flex items-center">
              <TextDiv>{data ? data : '입력해주세요'}</TextDiv>
              <RadiusButton onClick={onputForm}>수정</RadiusButton>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            {Component ? (
              <Component
                onChangeSave={onChangeSave}
                onChangeNumber={onChangeNumber}
                onSave={onData}
                isTrue={iserror}
              />
            ) : (
              <Textinput
                data-type="text"
                name={'name'}
                maxLength={10}
                // onChange={onChangeSave}
                onChange={onChangeName}
                type="text"
                isTrue={iserror}
              ></Textinput>
            )}
            <RadiusButton onClick={onClickForm}>확인</RadiusButton>

            <RadiusButton onClick={onCancelForm}>취소</RadiusButton>
          </div>
        )}
      </div>
      {<div className=" text-xs">{nameMessage}</div>}
    </div>
  );
};

export default ComponentsInput;

//onSave?.(name, value);
//컴포넌트화 시킬때 두가지 함수가 필요했따
//e , stringx
// 에러 컨트롤에 대한이해
//저장 메세지 폰넘버
//버튼마다 같은걸로 하려고 했음
//플로우 방식에 다양하다보니 정신이 없었따.
//간단하게 정리해서 풀어내는 방식이 중요한데 너무 흐름대로갔음
//모든 오류를 막는데에 계싼적으로 행동하지 못함
//컴포넌트화 실패
