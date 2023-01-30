import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'Redux/app/store';

export interface ModalState {
  isOpenModal: boolean;
}

const initialState = {
  isOpenModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export const madalState = (state: RootState) => state.modal;
export default modalSlice.reducer;
