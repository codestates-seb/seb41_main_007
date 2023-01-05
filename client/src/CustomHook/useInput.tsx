import { ChangeEvent, useCallback, useState, EventHandler } from 'react';

type UserInputProps = [string, (e: ChangeEvent) => void];

const useInput = (initialValue: string): UserInputProps => {
  const [userFormInput, setUserFormInput] = useState(initialValue);

  const onChangeForm = useCallback((e: any) => {
    //이 부분 e가 (e) 이렇게 변경됨
    setUserFormInput(e.target.value);
  }, []);

  return [userFormInput, onChangeForm];
};
export default useInput;
