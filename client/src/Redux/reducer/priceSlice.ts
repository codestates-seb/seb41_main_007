import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';

export interface Pricestate {
  id: number;
  price: number;
  count: number;
}
export interface Pricestate2 {
  id: number;

  count: number;
}

const initialState: Pricestate[] = [];

const priceSlice = createSlice({
  name: 'priceCheck',
  initialState,
  reducers: {
    countset: (state, action: PayloadAction<Pricestate>) => {
      const found = state.find((e) => e.id === action.payload.id);

      //같은게 있으면 종료 아닐경우에 넣어야함
      if (!found) {
        state.push({
          id: action.payload.id,
          price: action.payload.price,
          count: action.payload.count,
        });
      }
    },
    countput: (state, action: PayloadAction<Pricestate2>) => {
      console.log('갓다');
      state.forEach((el) => {
        if (el.id === action.payload.id) el.count = action.payload.count;
      });
    },
  },
});

export const { countset, countput } = priceSlice.actions;

export const selectprice = (state: RootState) => state.priceCheck;

export default priceSlice.reducer;
