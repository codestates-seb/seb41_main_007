import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';

export interface ObjectSaveState {
  review_id?: number;
  member_id?: number;
  product_id?: number;
  review_title?: string;
  review_content?: string;
  rating?: number;
  created_at?: string;
  modified_at?: string;
}

const initialState: ObjectSaveState[] = [
  {
    review_id: 3,
    member_id: 2,
    product_id: 5,
    review_title: '제목이에요',
    review_content: '이건 내용이에용내에용에욘ㅇ',
    rating: 5,
    created_at: '2022-10-5',
    modified_at: '2022-12-06',
    // review_image: ,
  },
];

const objectSaveSlice = createSlice({
  name: 'objectSave',
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<ObjectSaveState>) => {
      state.push(action.payload);
    },
  },
});

export const { saveData } = objectSaveSlice.actions;

export const selectSave = (state: RootState) => state.objectSave;

export default objectSaveSlice.reducer;
