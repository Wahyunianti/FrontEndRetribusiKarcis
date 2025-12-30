import api from './api';

export const getData = <T>(url: string) =>
  api.get<T>(url).then(res => res.data);

export const postData = <T>(url: string, data: any) =>
  api.post<T>(url, data).then(res => res.data);

export const putData = <T>(url: string, data: any) =>
  api.put<T>(url, data).then(res => res.data);

export const deleteData = <T>(url: string) =>
  api.delete<T>(url).then(res => res.data);
