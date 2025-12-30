import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GlobalErrorState {
  open: boolean;
  message: string | null;
  status?: number;
}

const initialState: GlobalErrorState = {
  open: false,
  message: null,
};

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    showError(
      state,
      action: PayloadAction<{ message: string; status?: number }>
    ) {
      state.open = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    closeError(state) {
      state.open = false;
      state.message = null;
      state.status = undefined;
    },
  },
});

export const { showError, closeError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
