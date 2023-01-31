import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';
import { TYPE_People } from 'Types/common/product';

const initialState: TYPE_People[] = [];

const personDataSlice = createSlice({
  name: 'personSave',
  initialState,
  reducers: {
    saveDataP: (state, action: PayloadAction<TYPE_People>) => {
      const found = state.find((e) => e.memberId === action.payload.memberId);
      if (!found) {
        state.push(action.payload);
      }
    },
  },
});

export const { saveDataP } = personDataSlice.actions;

export const selectDataP = (state: RootState) => state.personSave;

export default personDataSlice.reducer;
