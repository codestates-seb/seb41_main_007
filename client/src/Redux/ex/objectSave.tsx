import React from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/app/hook';
import {
  saveData,
  selectSave,
  ObjectSaveState,
} from 'Redux/reducer/objectSaveSlice';

const objectSaver: React.FC = () => {
  const save = useAppSelector(selectSave);
  const dispatch = useAppDispatch();
  const result: ObjectSaveState = { member_id: 2, review_content: '노맛' };
  return (
    <div>
      <div>
        <div>{save.length && save[0].review_content}</div>
        <div>{save.length && save[0].member_id}</div>
        <div>{save.length && save[0].review_content}</div>

        <button onClick={() => dispatch(saveData(result))}>save</button>
      </div>
    </div>
  );
};

export default objectSaver;
