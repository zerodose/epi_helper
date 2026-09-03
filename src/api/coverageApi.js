import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '@/config/api';

export const createCoverage = async data => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Authentication token not found. Please login again.');
  }

  const response = await api.post('/coverage', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCoverages = async params => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Authentication token not found. Please login again.');
  }

  const response = await api.get('/coverage', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCoverageById = async id => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Authentication token not found. Please login again.');
  }

  const response = await api.get(`/coverage/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateCoverage = async (id, data) => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Authentication token not found. Please login again.');
  }

  const response = await api.put(`/coverage/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteCoverage = async id => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Authentication token not found. Please login again.');
  }

  const response = await api.delete(`/coverage/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
