import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';
import { TYPE_UserAddress } from 'Types/common/product';

const initialState: TYPE_UserAddress[] = [];

const getDataSlice = createSlice({
  name: 'getDataSave',
  initialState,
  reducers: {
    get_DataSave: (state, action: PayloadAction<TYPE_UserAddress>) => {
      // const found = state.find(
      //   (e) => e.productOptionId === action.payload.productOptionId,
      // );
      // if (!found){}
      console.log(action.payload);

      state.push(action.payload);
    },
  },
});

export const { get_DataSave } = getDataSlice.actions;

export const getDataP = (state: RootState) => state.getDataSave;

export default getDataSlice.reducer;

//카운트버튼 오류 잡기위해 만듬
