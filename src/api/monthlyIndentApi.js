// import api from '@/config/api';

// export const createMonthlyIndent = async data => {
//   const response = await api.post('/monthly-indents', data);
//   return response.data;
// };

// export const getMonthlyIndents = async (params = {}) => {
//   const response = await api.get('/monthly-indents', {
//     params,
//   });

//   return response.data;
// };

// export const getMonthlyIndentById = async id => {
//   const response = await api.get(`/monthly-indents/${id}`);
//   return response.data;
// };

// export const updateMonthlyIndent = async (id, data) => {
//   const response = await api.put(`/monthly-indents/${id}`, data);
//   return response.data;
// };

// export const deleteMonthlyIndent = async id => {
//   const response = await api.delete(`/monthly-indents/${id}`);
//   return response.data;
// };

import api from '@/config/api';

export const createMonthlyIndent = async data => {
  const response = await api.post('/monthly-indents', data);
  return response.data;
};

export const getMonthlyIndents = async (params = {}) => {
  const response = await api.get('/monthly-indents', {
    params,
  });

  return response.data;
};

export const getMonthlyIndentById = async id => {
  const response = await api.get(`/monthly-indents/${id}`);
  return response.data;
};

export const updateMonthlyIndent = async (id, data) => {
  const response = await api.put(`/monthly-indents/${id}`, data);
  return response.data;
};

export const deleteMonthlyIndent = async id => {
  const response = await api.delete(`/monthly-indents/${id}`);
  return response.data;
};
