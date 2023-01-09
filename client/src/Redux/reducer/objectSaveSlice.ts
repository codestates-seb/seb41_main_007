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

const initialState: ObjectSaveState[] = [];

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
