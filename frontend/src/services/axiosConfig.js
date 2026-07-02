import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const axiosConfig = axios.create({
  baseURL: BACKEND_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
export { BACKEND_URL };