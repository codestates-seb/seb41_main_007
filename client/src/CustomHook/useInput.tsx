import React, { useCallback, useState } from 'react';

type OutputProps = [
  string | number,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
];

const useInput = (initialValue: string | number): OutputProps => {
  const [userFormInput, setUserFormInput] = useState<string | number>(
    initialValue,
  );
  const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserFormInput(e.target.value);
  }, []);

  return [userFormInput, onChangeForm];
};
export default useInput;
