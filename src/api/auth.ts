// src/api/auth.ts
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://siku-ten.vercel.app//api',
});

export const loginAPI = async (email: string, password: string) => {
    return API.post('/login', { email, password });
};

export const registerAPI = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) => {
    return API.post('/register', data);
};

export const logoutAPI = async (token: string) => {
    return API.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchUserAPI = async (token: string) => {
    return API.get('/user', {
        headers: { Authorization: `Bearer ${token}` }
    });
};
