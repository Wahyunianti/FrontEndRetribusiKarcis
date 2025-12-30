import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import globalErrorReducer from './globalErrorSlice';
import jenisKarcisReducer from './jenisKarcisSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    globalError: globalErrorReducer,
    jenisKarcis: jenisKarcisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;