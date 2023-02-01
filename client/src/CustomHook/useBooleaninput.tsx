import React, { useCallback, useState, Dispatch, SetStateAction } from 'react';

type OutputProps = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useBooleanInput = (initialValue: boolean): OutputProps => {
  const [Control, setControl] = useState<boolean>(initialValue);

  const onClickForm = () => {
    setControl(!Control);
  };

  return [Control, onClickForm, setControl];
};
export default useBooleanInput;
