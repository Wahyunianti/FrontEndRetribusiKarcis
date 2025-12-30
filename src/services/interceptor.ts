import api from './api';
import { store } from '../store';
import { showError } from '../store/globalErrorSlice';
import { logout } from '../store/authSlice';

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status ?? 0;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Terjadi kesalahan pada server';

    const url = error?.config?.url || '';

    if (url) {
      store.dispatch(
        showError({
          message,
          status,
        })
      );
    }

    if (status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);
