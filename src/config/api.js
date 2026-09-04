import axios from 'axios';

const API_BASE_URL = 'https://epi-helper-backend.onrender.com';
// const API_BASE_URL = 'http://192.168.100.12:5000';
// 
// const API_BASE_URL = 'http://10.29.214.208:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
