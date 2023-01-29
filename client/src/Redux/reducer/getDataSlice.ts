import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';
import { TYPE_CartData } from 'Types/common/product';

const initialState: TYPE_CartData[] = [];

const getDataSlice = createSlice({
  name: 'getDataSave',
  initialState,
  reducers: {
    get_DataSave: (state, action: PayloadAction<TYPE_CartData>) => {
      const found = state.find(
        (e) => e.productOptionId === action.payload.productOptionId,
      );
      if (!found) {
        console.log(action.payload);

        state.push(action.payload);
      }
    },
  },
});

export const { get_DataSave } = getDataSlice.actions;

export const selectDataP = (state: RootState) => state.getDataSave;

export default getDataSlice.reducer;

//카운트버튼 오류 잡기위해 만듬
