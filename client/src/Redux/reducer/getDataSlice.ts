import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';

import { TYPE_getAddress } from 'Types/common/product';
const initialState: TYPE_getAddress[] = [];

const getDataSlice = createSlice({
  name: 'getDataSave',
  initialState,
  reducers: {
    get_DataSave: (state, action: PayloadAction<TYPE_getAddress>) => {
      const found = state.find((e) => e.addressId === action.payload.addressId);
      if (!found) {
        console.log(action.payload);

        state.push(action.payload);
      }
    },
  },
});

export const { get_DataSave } = getDataSlice.actions;

export const getDataP = (state: RootState) => state.getDataSave;

export default getDataSlice.reducer;

//카운트버튼 오류 잡기위해 만듬
