import axios from "axios";

const api = axios.create({
    baseURL: "https://saku-production.up.railway.app/api", // tanpa /api karena Sanctum CSRF cookie berasal dari root
    withCredentials: true, // ini WAJIB
});

export const getUser = async () => {
    const response = await axios.get('/user'); // endpoint harus di-protect sanctum
    return response.data.user;
};


export default api;
