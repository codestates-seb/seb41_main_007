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

export interface Pricestate3 {
  id: number;
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
      state.forEach((el) => {
        if (el.id === action.payload.id) el.count = action.payload.count;
      });
    },

    countDelete: (state, action: PayloadAction<Pricestate3>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          state.splice(i, 1);
          i--;
        }
      }
    },
  },
});

export const { countset, countput, countDelete } = priceSlice.actions;

export const selectprice = (state: RootState) => state.priceCheck;

export default priceSlice.reducer;

//리덕스 딜리트 기능 안되는지 뮤테일브만 먹고
//재할당은 안먹힘
