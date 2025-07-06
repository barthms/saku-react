import api from './api';

// AuthContext.ts
export const getCSRFToken = () =>('/sanctum/csrf-cookie'); // TANPA /api
export const login = (data) => api.post('/login', data);       // PAKAI /api
export const register = (data) => api.post('/register', data); // PAKAI /api
export const logout = () => api.post('/logout');               // PAKAI /api
export const fetchUser = () => api.get('/me');                 // PAKAI /api

