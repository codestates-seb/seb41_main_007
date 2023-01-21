import React, { useCallback, useState } from 'react';

type OutputProps = [boolean, () => void];

const useBooleanInput = (initialValue: boolean): OutputProps => {
  const [Control, setControl] = useState<boolean>(initialValue);

  const onClickForm = () => {
    setControl(!Control);
  };

  return [Control, onClickForm];
};
export default useBooleanInput;
