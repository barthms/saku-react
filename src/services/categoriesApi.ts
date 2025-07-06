import api from "./api";


export const getCategories = () => api.get("/categories");
export const getCategoriesById = (id: any) => api.get(`/categories/${id}`);
export const createCategories = (data: any) => api.post("/categories", data);
export const deleteCategories = (id: any) => api.delete(`/categories/${id}`);