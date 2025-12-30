import api from './api';

export const JenisKarcisService = {
  getAll: () => api.get('/jenis-karcis').then(res => res.data),
};