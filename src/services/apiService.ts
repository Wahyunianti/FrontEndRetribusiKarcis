import api from './api';

export const JenisKarcisService = {
  getAll: () => api.get('/jenis-karcis').then(res => res.data),
};

export const UserService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  remove: (id: string) => api.delete(`/users/${id}`),
};

export const PengawasService = {
  getAll: () => api.get('/pengawas'),
  getById: (id: string) => api.get(`/pengawas/${id}`),
  create: (data: any) => api.post('/pengawas', data),
  update: (id: string, data: FormData) => {
    data.append('_method', 'PUT');
    return api.post(`/pengawas/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  remove: (id: string) => api.delete(`/pengawas/${id}`),
};

export const WajibRetribusiService = {
  getAll: () => api.get('/wajib-retribusi'),
  getAllName: (params: { page: number; keyword?: string }) =>
    api.get('/wajib-retribusi-name', {
      params,
    }),
  getById: (id: string) => api.get(`/wajib-retribusi/${id}`),
  create: (data: any) => api.post('/wajib-retribusi', data),
  update: (id: string, data: FormData) => {
    data.append('_method', 'PUT');
    return api.post(`/wajib-retribusi/${id}`, data);
  },
  remove: (id: string) => api.delete(`/wajib-retribusi/${id}`),
};

export const ZonaService = {
  getAll: () => api.get('/zona').then(res => res.data),
  getById: (id: string) => api.get(`/zona/${id}`).then(res => res.data),
  create: (data: FormData) => api.post('/zona', data).then(res => res.data),
  update: (id: string, data: FormData) => {
    data.append('_method', 'PUT');
    return api.post(`/zona/${id}`, data);
  },
  remove: (id: string) => api.delete(`/zona/${id}`),
};

export const StatusService = {
  getAll: () => api.get('/status').then(res => res.data),
};

export const TransaksiService = {
  getAll: (params?: { page?: number, search?: string, month?: string , year?: string }) =>
    api.get('/transaksi', { params }),
  create: (payload: FormData) =>
    api.post('/transaksi', payload),
  remove: (id: string) =>
    api.delete(`/transaksi/${id}`),
};