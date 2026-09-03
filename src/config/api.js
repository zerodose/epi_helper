import axios from 'axios';

const API_BASE_URL = 'https://epi-helper-backend.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
