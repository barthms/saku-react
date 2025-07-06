import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // tanpa /api karena Sanctum CSRF cookie berasal dari root
    withCredentials: true, // ini WAJIB
});

export const getUser = async () => {
    const response = await axios.get('/user'); // endpoint harus di-protect sanctum
    return response.data.user;
};


export default api;
