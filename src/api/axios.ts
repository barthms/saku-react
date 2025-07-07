// src/api/axios.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://saku-production.up.railway.app/api', // Langsung ke /api
});

// Interceptor untuk menambahkan token ke setiap request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN'); // Ambil token dari localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;