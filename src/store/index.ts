import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import globalErrorReducer from './globalErrorSlice';
import jenisKarcisReducer from './jenisKarcisSlice';
import userReducer from './userSlice';
import pengawasReducer from './pengawasSlice';
import zonaReducer from './zonaSlice';
import wajibRetribusiReducer from './wajibRetribusiSlice';
import statusReducer from './statusSlice';
import transaksiReducer from './transaksiSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    globalError: globalErrorReducer,
    jenisKarcis: jenisKarcisReducer,
    user: userReducer,
    pengawas: pengawasReducer,
    zona: zonaReducer,
    retribusi: wajibRetribusiReducer,
    status: statusReducer,
    transaksi: transaksiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;